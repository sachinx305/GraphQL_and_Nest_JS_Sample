import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = this.roleRepository.create(createRoleInput);
    let newRole = await this.roleRepository.save(role);
    return await this.findOne(newRole.id);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['userRoles', 'userRoles.user', 'rolePermissions', 'rolePermissions.permission'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.user', 'rolePermissions', 'rolePermissions.permission'],
    });
    if (!role) throw new Error('Role not found');
    return role;
  }

  async update(id: string, updateRoleInput: UpdateRoleInput): Promise<Role> {
    const role = await this.findOne(id);
    
    Object.assign(role, updateRoleInput);
    return this.roleRepository.save(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    await this.roleRepository.delete(id);
    return role;
  }
}
