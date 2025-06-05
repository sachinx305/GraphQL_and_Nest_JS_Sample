import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionInput: CreatePermissionInput): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionInput);
    let newPermission = await this.permissionRepository.save(permission);
    return await this.findOne(newPermission.id);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find({
      relations: ['rolePermissions', 'rolePermissions.role'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id },
      relations: ['rolePermissions', 'rolePermissions.role'],
    });
    if (!permission) throw new Error('Permission not found');
    return permission;
  }

  async update(id: string, updatePermissionInput: UpdatePermissionInput): Promise<Permission> {
    await this.permissionRepository.update(id, updatePermissionInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Permission> {
    const permission = await this.findOne(id);
    await this.permissionRepository.delete(id);
    return { ...permission, id };
  }
}
