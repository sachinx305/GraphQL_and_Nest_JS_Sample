import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentInput);
    let newDepartment = await this.departmentRepository.save(department);
    return await this.findOne(newDepartment.id);
  }

  async findAll(organizationId?: string): Promise<Department[]> {
    const where = organizationId ? { organizationId } : {};
    return this.departmentRepository.find({
      where,
      relations: ['organization', 'teams', 'teams.users', 'teams.users.userRoles', 'teams.users.userRoles.role', 'teams.users.userRoles.role.rolePermissions', 'teams.users.userRoles.role.rolePermissions.permission'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['organization', 'teams', 'teams.users', 'teams.users.userRoles', 'teams.users.userRoles.role', 'teams.users.userRoles.role.rolePermissions', 'teams.users.userRoles.role.rolePermissions.permission'],
    });
    if (!department) throw new Error('Department not found');
    return department;
  }

  async update(id: string, updateDepartmentInput: UpdateDepartmentInput): Promise<Department> {
    const department = await this.findOne(id);
    
    Object.assign(department, updateDepartmentInput);
    return this.departmentRepository.save(department);
  }

  async remove(id: string) {
    const department = await this.findOne(id);
    await this.departmentRepository.delete(id);
    return department;
  }
}
