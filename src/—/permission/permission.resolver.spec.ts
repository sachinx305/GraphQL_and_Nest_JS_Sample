import { Test, TestingModule } from '@nestjs/testing';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

describe('PermissionResolver', () => {
  let resolver: PermissionResolver;
  let service: PermissionService;

  const mockPermission = {
    id: '1',
    name: 'Test Permission',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPermissionService = {
    create: jest.fn().mockResolvedValue(mockPermission),
    findAll: jest.fn().mockResolvedValue([mockPermission]),
    findOne: jest.fn().mockResolvedValue(mockPermission),
    update: jest.fn().mockResolvedValue(mockPermission),
    remove: jest.fn().mockResolvedValue(mockPermission),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionResolver,
        {
          provide: PermissionService,
          useValue: mockPermissionService,
        },
      ],
    }).compile();

    resolver = module.get<PermissionResolver>(PermissionResolver);
    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createPermission', () => {
    it('should create a new permission', async () => {
      const createPermissionInput: CreatePermissionInput = {
        name: 'Test Permission',
        description: 'Test Description',
      };

      const result = await resolver.createPermission(createPermissionInput);
      expect(result).toEqual(mockPermission);
      expect(service.create).toHaveBeenCalledWith(createPermissionInput);
    });
  });

  describe('findAllPermissions', () => {
    it('should return an array of permissions', async () => {
      const result = await resolver.findAllPermissions();
      expect(result).toEqual([mockPermission]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOnePermission', () => {
    it('should return a permission by id', async () => {
      const result = await resolver.findOnePermission('1');
      expect(result).toEqual(mockPermission);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updatePermission', () => {
    it('should update a permission', async () => {
      const updatePermissionInput: UpdatePermissionInput = {
        id: '1',
        name: 'Updated Permission',
      };

      const result = await resolver.updatePermission(updatePermissionInput);
      expect(result).toEqual(mockPermission);
      expect(service.update).toHaveBeenCalledWith('1', updatePermissionInput);
    });
  });

  describe('removePermission', () => {
    it('should remove a permission', async () => {
      const result = await resolver.removePermission('1');
      expect(result).toEqual(mockPermission);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
