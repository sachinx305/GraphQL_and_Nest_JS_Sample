import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionResolver } from './role-permission.resolver';
import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';

describe('RolePermissionResolver', () => {
  let resolver: RolePermissionResolver;
  let service: RolePermissionService;

  const mockRolePermission = {
    id: '1',
    roleId: '1',
    permissionId: '1',
    role: {
      id: '1',
      name: 'Test Role',
      description: 'Test Description',
    },
    permission: {
      id: '1',
      name: 'Test Permission',
      description: 'Test Description',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRolePermissionService = {
    create: jest.fn().mockResolvedValue(mockRolePermission),
    findAll: jest.fn().mockResolvedValue([mockRolePermission]),
    findOne: jest.fn().mockResolvedValue(mockRolePermission),
    update: jest.fn().mockResolvedValue(mockRolePermission),
    remove: jest.fn().mockResolvedValue(mockRolePermission),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolePermissionResolver,
        {
          provide: RolePermissionService,
          useValue: mockRolePermissionService,
        },
      ],
    }).compile();

    resolver = module.get<RolePermissionResolver>(RolePermissionResolver);
    service = module.get<RolePermissionService>(RolePermissionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createRolePermission', () => {
    it('should create a new role permission', async () => {
      const createRolePermissionInput: CreateRolePermissionInput = {
        roleId: '1',
        permissionId: '1',
      };

      const result = await resolver.createRolePermission(createRolePermissionInput);
      expect(result).toEqual(mockRolePermission);
      expect(service.create).toHaveBeenCalledWith(createRolePermissionInput);
    });
  });

  describe('findAllRolePermissions', () => {
    it('should return an array of role permissions', async () => {
      const result = await resolver.findAllRolePermissions();
      expect(result).toEqual([mockRolePermission]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneRolePermission', () => {
    it('should return a role permission by id', async () => {
      const result = await resolver.findOneRolePermission('1');
      expect(result).toEqual(mockRolePermission);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateRolePermission', () => {
    it('should update a role permission', async () => {
      const updateRolePermissionInput: UpdateRolePermissionInput = {
        id: '1',
        roleId: '2',
      };

      const result = await resolver.updateRolePermission(updateRolePermissionInput);
      expect(result).toEqual(mockRolePermission);
      expect(service.update).toHaveBeenCalledWith('1', updateRolePermissionInput);
    });
  });

  describe('removeRolePermission', () => {
    it('should remove a role permission', async () => {
      const result = await resolver.removeRolePermission('1');
      expect(result).toEqual(mockRolePermission);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
