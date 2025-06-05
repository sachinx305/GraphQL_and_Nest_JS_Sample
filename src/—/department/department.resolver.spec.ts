import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

describe('DepartmentResolver', () => {
  let resolver: DepartmentResolver;
  let service: DepartmentService;

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

  const mockDepartmentService = {
    create: jest.fn().mockResolvedValue(mockDepartment),
    findAll: jest.fn().mockResolvedValue([mockDepartment]),
    findOne: jest.fn().mockResolvedValue(mockDepartment),
    update: jest.fn().mockResolvedValue(mockDepartment),
    remove: jest.fn().mockResolvedValue(mockDepartment),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentResolver,
        {
          provide: DepartmentService,
          useValue: mockDepartmentService,
        },
      ],
    }).compile();

    resolver = module.get<DepartmentResolver>(DepartmentResolver);
    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createDepartment', () => {
    it('should create a new department', async () => {
      const createDepartmentInput: CreateDepartmentInput = {
        name: 'Test Department',
        description: 'Test Description',
        organizationId: '1',
      };

      const result = await resolver.createDepartment(createDepartmentInput);
      expect(result).toEqual(mockDepartment);
      expect(service.create).toHaveBeenCalledWith(createDepartmentInput);
    });
  });

  describe('findAllDepartment', () => {
    it('should return an array of departments', async () => {
      const result = await resolver.findAllDepartment();
      expect(result).toEqual([mockDepartment]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneDepartment', () => {
    it('should return a department by id', async () => {
      const result = await resolver.findOneDepartment('1');
      expect(result).toEqual(mockDepartment);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateDepartment', () => {
    it('should update a department', async () => {
      const updateDepartmentInput: UpdateDepartmentInput = {
        id: '1',
        name: 'Updated Department',
      };

      const result = await resolver.updateDepartment(updateDepartmentInput);
      expect(result).toEqual(mockDepartment);
      expect(service.update).toHaveBeenCalledWith('1', updateDepartmentInput);
    });
  });

  describe('removeDepartment', () => {
    it('should remove a department', async () => {
      const result = await resolver.removeDepartment('1');
      expect(result).toEqual(mockDepartment);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
