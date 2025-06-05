import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { OrgSortBy } from './enums/org-sortby.enum';
import { SortOrder } from './enums/sort-order.enum';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let repository: Repository<Organization>;

  const mockOrganization = {
    id: '1',
    name: 'Test Organization',
    description: 'Test Description',
    address: 'Test Address',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((organization) => Promise.resolve({ ...organization, id: '1' })),
    findAndCount: jest.fn().mockResolvedValue([[mockOrganization], 1]),
    findOne: jest.fn().mockResolvedValue(mockOrganization),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: getRepositoryToken(Organization),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    repository = module.get<Repository<Organization>>(getRepositoryToken(Organization));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new organization', async () => {
      const createOrganizationInput: CreateOrganizationInput = {
        name: 'Test Organization',
        description: 'Test Description',
        address: 'Test Address',
      };

      const result = await service.create(createOrganizationInput);
      expect(result.name).toEqual(mockOrganization.name);
      expect(result.description).toEqual(mockOrganization.description);
      expect(result.address).toEqual(mockOrganization.address);
      expect(repository.create).toHaveBeenCalledWith(createOrganizationInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of organizations', async () => {
      const result = await service.findAll(1, 10, OrgSortBy.NAME, SortOrder.ASC);
      expect(result.organizations[0].name).toEqual(mockOrganization.name);
      expect(result.organizations[0].description).toEqual(mockOrganization.description);
      expect(result.organizations[0].address).toEqual(mockOrganization.address);
      expect(result.total).toEqual(1);
      expect(repository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: {
          [OrgSortBy.NAME]: SortOrder.ASC,
        },
        relations: ['departments', 'departments.teams', 'departments.teams.users', 'departments.teams.users.userRoles', 'departments.teams.users.userRoles.role', 'departments.teams.users.userRoles.role.rolePermissions', 'departments.teams.users.userRoles.role.rolePermissions.permission'],
      });
    });
  });

  describe('findOne', () => {
    it('should return an organization by id', async () => {
      const result = await service.findOne('1');
      expect(result.name).toEqual(mockOrganization.name);
      expect(result.description).toEqual(mockOrganization.description);
      expect(result.address).toEqual(mockOrganization.address);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['departments', 'departments.teams', 'departments.teams.users', 'departments.teams.users.userRoles', 'departments.teams.users.userRoles.role', 'departments.teams.users.userRoles.role.rolePermissions', 'departments.teams.users.userRoles.role.rolePermissions.permission']
      });
    });

    it('should throw an error if organization not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('Organization with ID 1 not found');
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
      const updateOrganizationInput: UpdateOrganizationInput = {
        id: '1',
        name: 'Updated Organization',
        description: 'Updated Description',
      };

      const result = await service.update('1', updateOrganizationInput);
      expect(result.name).toEqual(updateOrganizationInput.name);
      expect(result.description).toEqual(updateOrganizationInput.description);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['departments', 'departments.teams', 'departments.teams.users', 'departments.teams.users.userRoles', 'departments.teams.users.userRoles.role', 'departments.teams.users.userRoles.role.rolePermissions', 'departments.teams.users.userRoles.role.rolePermissions.permission'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove an organization', async () => {
      const result = await service.remove('1');
      expect(result.name).toEqual(mockOrganization.name);
      expect(result.description).toEqual(mockOrganization.description);
      expect(result.address).toEqual(mockOrganization.address);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
