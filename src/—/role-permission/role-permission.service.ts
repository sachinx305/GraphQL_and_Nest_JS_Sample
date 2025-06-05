import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async create(createRolePermissionInput: CreateRolePermissionInput): Promise<RolePermission> {
    const rolePermission = this.rolePermissionRepository.create(createRolePermissionInput);
    let newRolePermission = await this.rolePermissionRepository.save(rolePermission);
    return await this.findOne(newRolePermission.id);
  }

  async findAll(): Promise<RolePermission[]> {
    return await this.rolePermissionRepository.find({
      relations: ['role', 'permission'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<RolePermission> {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { id },
      relations: ['role', 'permission'],
    });
    if (!rolePermission) throw new Error('RolePermission not found');
    return rolePermission;
  }

  async update(id: string, updateRolePermissionInput: UpdateRolePermissionInput): Promise<RolePermission> {
    await this.rolePermissionRepository.update(id, updateRolePermissionInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<RolePermission> {
    const rolePermission = await this.findOne(id);
    await this.rolePermissionRepository.delete(id);
    return { ...rolePermission, id };
  }
}
