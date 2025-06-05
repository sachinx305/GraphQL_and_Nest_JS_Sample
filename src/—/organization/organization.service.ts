import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { OrgSortBy } from './enums/org-sortby.enum';
import { SortOrder } from './enums/sort-order.enum';


@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationInput: CreateOrganizationInput): Promise<Organization> {
    const organization = this.organizationRepository.create(createOrganizationInput);
    return this.organizationRepository.save(organization);
  }

  async findAll(page: number, limit: number, sortBy: OrgSortBy, sortOrder: SortOrder): Promise<{ organizations: Organization[], total: number }> {
    const [organizations, total] = await this.organizationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: sortOrder },
      relations: ['departments', 'departments.teams', 'departments.teams.users', 'departments.teams.users.userRoles', 'departments.teams.users.userRoles.role', 'departments.teams.users.userRoles.role.rolePermissions', 'departments.teams.users.userRoles.role.rolePermissions.permission'],
    });
    return { organizations, total };
  }

  async findOne(id: string): Promise<Organization> {
    const org = await this.organizationRepository.findOne({ 
      where: { id },
      relations: ['departments', 'departments.teams', 'departments.teams.users', 'departments.teams.users.userRoles', 'departments.teams.users.userRoles.role', 'departments.teams.users.userRoles.role.rolePermissions', 'departments.teams.users.userRoles.role.rolePermissions.permission'],
    });
    if (!org) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return org;
  }

  async update(id: string, updateOrganizationInput: UpdateOrganizationInput): Promise<Organization> {
    const organization = await this.organizationRepository.preload({
      ...updateOrganizationInput, id
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    return this.organizationRepository.save(organization);
  }

  async remove(id: string): Promise<Organization> {
    const organization = await this.findOne(id);
    
    if (organization.departments && organization.departments.length > 0) {
      throw new BadRequestException('Cannot delete organization with existing departments. Please delete all departments first.');
    }

    await this.organizationRepository.remove(organization);
    return {...organization, id};
  }
}
