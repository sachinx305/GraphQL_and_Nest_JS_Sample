import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

describe('RoleService', () => {
  let service: RoleService;
  let repository: Repository<Role>;

  const mockRole = {
    id: '1',
    name: 'Test Role',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((role) => Promise.resolve({ ...role, id: '1' })),
    find: jest.fn().mockResolvedValue([mockRole]),
    findOne: jest.fn().mockResolvedValue(mockRole),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const createRoleInput: CreateRoleInput = {
        name: 'Test Role',
        description: 'Test Description',
      };

      const result = await service.create(createRoleInput);
      expect(result.name).toEqual(mockRole.name);
      expect(result.description).toEqual(mockRole.description);
      expect(repository.create).toHaveBeenCalledWith(createRoleInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const result = await service.findAll();
      expect(result[0].name).toEqual(mockRole.name);
      expect(result[0].description).toEqual(mockRole.description);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['userRoles', 'userRoles.user', 'rolePermissions', 'rolePermissions.permission'],
        order: { createdAt: 'DESC' }
      });
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockRole);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['userRoles', 'userRoles.user', 'rolePermissions', 'rolePermissions.permission'],
      });
    });

    it('should throw an error if role not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('Role not found');
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const updateRoleInput: UpdateRoleInput = {
        id: '1',
        name: 'Updated Role',
        description: 'Updated Description',
      };

      const result = await service.update('1', updateRoleInput);
      expect(result.name).toEqual(updateRoleInput.name);
      expect(result.description).toEqual(updateRoleInput.description);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['userRoles', 'userRoles.user', 'rolePermissions', 'rolePermissions.permission'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      const result = await service.remove('1');
      expect(result.name).toEqual(mockRole.name);
      expect(result.description).toEqual(mockRole.description);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
