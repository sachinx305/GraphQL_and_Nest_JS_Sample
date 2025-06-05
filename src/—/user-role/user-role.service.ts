import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createUserRoleInput: CreateUserRoleInput): Promise<UserRole> {
    const userRole = this.userRoleRepository.create(createUserRoleInput);
    let newUserRole = await this.userRoleRepository.save(userRole);
    return await this.findOne(newUserRole.id);
  }

  async findAll(userId?: string, roleId?: string): Promise<UserRole[]> {
    const where: any = {};
    if (userId) where.userId = userId;
    if (roleId) where.roleId = roleId;

    return this.userRoleRepository.find({
      where,
      relations: ['user', 'role'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
      relations: ['user', 'role'],
    });
    if (!userRole) {
      throw new NotFoundException('User role not found');
    }
    return userRole;
  }

  async update(id: string, updateUserRoleInput: UpdateUserRoleInput): Promise<UserRole> {
    await this.userRoleRepository.update(id, updateUserRoleInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<UserRole> {
    const userRole = await this.findOne(id);
    await this.userRoleRepository.delete(id);
    return { ...userRole, id };
  }
}
