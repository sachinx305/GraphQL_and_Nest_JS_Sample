import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionService } from './role-permission.service';
import { RolePermission } from './entities/role-permission.entity';
import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';

describe('RolePermissionService', () => {
  let service: RolePermissionService;
  let repository: Repository<RolePermission>;

  const mockRolePermission = {
    id: '1',
    roleId: '1',
    permissionId: '1',
    role: {
      id: '1',
      name: 'Test Role',
    },
    permission: {
      id: '1',
      name: 'Test Permission',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((rolePermission) => Promise.resolve({ ...rolePermission, id: '1' })),
    find: jest.fn().mockResolvedValue([mockRolePermission]),
    findOne: jest.fn().mockResolvedValue(mockRolePermission),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolePermissionService,
        {
          provide: getRepositoryToken(RolePermission),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RolePermissionService>(RolePermissionService);
    repository = module.get<Repository<RolePermission>>(getRepositoryToken(RolePermission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new role permission', async () => {
      const createRolePermissionInput: CreateRolePermissionInput = {
        roleId: '1',
        permissionId: '1',
      };

      const result = await service.create(createRolePermissionInput);
      expect(result).toEqual(mockRolePermission);
      expect(repository.create).toHaveBeenCalledWith(createRolePermissionInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of role permissions', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockRolePermission]);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['role', 'permission'],
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a role permission by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockRolePermission);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['role', 'permission'],
      });
    });

    it('should throw an error if role permission not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('RolePermission not found');
    });
  });

  describe('update', () => {
    it('should update a role permission', async () => {
      const updateRolePermissionInput: UpdateRolePermissionInput = {
        id: '1',
        permissionId: '2',
      };

      const result = await service.update('1', updateRolePermissionInput);
      expect(result.permissionId).toEqual(updateRolePermissionInput.permissionId);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['role', 'permission'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a role permission', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockRolePermission);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
