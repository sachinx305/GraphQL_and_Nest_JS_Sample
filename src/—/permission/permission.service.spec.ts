import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

describe('PermissionService', () => {
  let service: PermissionService;
  let repository: Repository<Permission>;

  const mockPermission = {
    id: '1',
    name: 'Test Permission',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((permission) => Promise.resolve({ ...permission, id: '1' })),
    find: jest.fn().mockResolvedValue([mockPermission]),
    findOne: jest.fn().mockResolvedValue(mockPermission),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(Permission),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    repository = module.get<Repository<Permission>>(getRepositoryToken(Permission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new permission', async () => {
      const createPermissionInput: CreatePermissionInput = {
        name: 'Test Permission',
        description: 'Test Description',
      };

      const result = await service.create(createPermissionInput);
      expect(result.name).toEqual(mockPermission.name);
      expect(result.description).toEqual(mockPermission.description);
      expect(repository.create).toHaveBeenCalledWith(createPermissionInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of permissions', async () => {
      const result = await service.findAll();
      expect(result[0].name).toEqual(mockPermission.name);
      expect(result[0].description).toEqual(mockPermission.description);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['rolePermissions', 'rolePermissions.role'],
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a permission by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockPermission);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['rolePermissions', 'rolePermissions.role'],
      });
    });

    it('should throw an error if permission not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('Permission not found');
    });
  });

  describe('update', () => {
    it('should update a permission', async () => {
      const updatePermissionInput: UpdatePermissionInput = {
        id: '1',
        name: 'Updated Permission',
        description: 'Updated Description',
      };

      const result = await service.update('1', updatePermissionInput);
      expect(result.name).toEqual(updatePermissionInput.name);
      expect(result.description).toEqual(updatePermissionInput.description);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['rolePermissions', 'rolePermissions.role'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a permission', async () => {
      const result = await service.remove('1');
      expect(result.name).toEqual(mockPermission.name);
      expect(result.description).toEqual(mockPermission.description);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
