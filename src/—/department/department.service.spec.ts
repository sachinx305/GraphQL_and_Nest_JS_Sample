import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let repository: Repository<Department>;

  const mockDepartment = {
    id: '1',
    name: 'Test Department',
    description: 'Test Description',
    organizationId: '1',
    organization: {
      id: '1',
      name: 'Test Organization',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((department) => Promise.resolve({ ...department, id: '1' })),
    find: jest.fn().mockResolvedValue([mockDepartment]),
    findOne: jest.fn().mockResolvedValue(mockDepartment),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
    repository = module.get<Repository<Department>>(getRepositoryToken(Department));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new department', async () => {
      const createDepartmentInput: CreateDepartmentInput = {
        name: 'Test Department',
        description: 'Test Description',
        organizationId: '1',
      };

      const result = await service.create(createDepartmentInput);
      expect(result).toEqual(mockDepartment);
      expect(repository.create).toHaveBeenCalledWith(createDepartmentInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of departments', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockDepartment]);
      expect(repository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
        where: {},
        relations: ['organization', 'teams', 'teams.users', 'teams.users.userRoles', 'teams.users.userRoles.role', 'teams.users.userRoles.role.rolePermissions', 'teams.users.userRoles.role.rolePermissions.permission'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a department by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockDepartment);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['organization', 'teams', 'teams.users', 'teams.users.userRoles', 'teams.users.userRoles.role', 'teams.users.userRoles.role.rolePermissions', 'teams.users.userRoles.role.rolePermissions.permission'],
      });
    });

    it('should throw an error if department not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('Department not found');
    });
  });

  describe('update', () => {
    it('should update a department', async () => {
      const updateDepartmentInput: UpdateDepartmentInput = {
        id: '1',
        name: 'Updated Department',
        description: 'Updated Description',
      };

      const result = await service.update('1', updateDepartmentInput);
      expect(result.name).toEqual(updateDepartmentInput.name);
      expect(result.description).toEqual(updateDepartmentInput.description);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['organization', 'teams', 'teams.users', 'teams.users.userRoles', 'teams.users.userRoles.role', 'teams.users.userRoles.role.rolePermissions', 'teams.users.userRoles.role.rolePermissions.permission'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a department', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockDepartment);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
