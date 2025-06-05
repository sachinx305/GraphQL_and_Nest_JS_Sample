import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleService } from './user-role.service';
import { UserRole } from './entities/user-role.entity';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';

describe('UserRoleService', () => {
  let service: UserRoleService;
  let repository: Repository<UserRole>;

  const mockUserRole = {
    id: '1',
    userId: '1',
    roleId: '1',
    user: {
      id: '1',
      name: 'John Doe',
    },
    role: {
      id: '1',
      name: 'Test Role',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((userRole) => Promise.resolve({ ...userRole, id: '1' })),
    find: jest.fn().mockResolvedValue([mockUserRole]),
    findOne: jest.fn().mockResolvedValue(mockUserRole),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleService,
        {
          provide: getRepositoryToken(UserRole),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserRoleService>(UserRoleService);
    repository = module.get<Repository<UserRole>>(getRepositoryToken(UserRole));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user role', async () => {
      const createUserRoleInput: CreateUserRoleInput = {
        userId: '1',
        roleId: '1',
      };

      const result = await service.create(createUserRoleInput);
      expect(result).toEqual(mockUserRole);
      expect(repository.create).toHaveBeenCalledWith(createUserRoleInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of user roles', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUserRole]);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['user', 'role', 'role.rolePermissions', 'role.rolePermissions.permission'],
        order: { createdAt: 'DESC' },
        where: {},
      });
    });
  });

  describe('findOne', () => {
    it('should return a user role by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockUserRole);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['user', 'role', 'role.rolePermissions', 'role.rolePermissions.permission'],
      });
    });

    it('should throw an error if user role not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('User role not found');
    });
  });

  describe('update', () => {
    it('should update a user role', async () => {
      const updateUserRoleInput: UpdateUserRoleInput = {
        id: '1',
        roleId: '2',
      };

      const result = await service.update('1', updateUserRoleInput);
      expect(result.roleId).toEqual(updateUserRoleInput.roleId);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['user', 'role', 'role.rolePermissions', 'role.rolePermissions.permission'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a user role', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockUserRole);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
