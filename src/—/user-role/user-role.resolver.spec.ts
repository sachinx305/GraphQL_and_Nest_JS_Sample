import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleResolver } from './user-role.resolver';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';

describe('UserRoleResolver', () => {
  let resolver: UserRoleResolver;
  let service: UserRoleService;

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

  const mockUserRoleService = {
    create: jest.fn().mockResolvedValue(mockUserRole),
    findAll: jest.fn().mockResolvedValue([mockUserRole]),
    findOne: jest.fn().mockResolvedValue(mockUserRole),
    update: jest.fn().mockResolvedValue(mockUserRole),
    remove: jest.fn().mockResolvedValue(mockUserRole),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleResolver,
        {
          provide: UserRoleService,
          useValue: mockUserRoleService,
        },
      ],
    }).compile();

    resolver = module.get<UserRoleResolver>(UserRoleResolver);
    service = module.get<UserRoleService>(UserRoleService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUserRole', () => {
    it('should create a new user role', async () => {
      const createUserRoleInput: CreateUserRoleInput = {
        userId: '1',
        roleId: '1',
      };

      const result = await resolver.createUserRole(createUserRoleInput);
      expect(result).toEqual(mockUserRole);
      expect(service.create).toHaveBeenCalledWith(createUserRoleInput);
    });
  });

  describe('findAllUserRole', () => {
    it('should return an array of user roles', async () => {
      const result = await resolver.findAllUserRole();
      expect(result).toEqual([mockUserRole]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneUserRole', () => {
    it('should return a user role by id', async () => {
      const result = await resolver.findOneUserRole('1');
      expect(result).toEqual(mockUserRole);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateUserRole', () => {
    it('should update a user role', async () => {
      const updateUserRoleInput: UpdateUserRoleInput = {
        id: '1',
        roleId: '2',
      };

      const result = await resolver.updateUserRole(updateUserRoleInput);
      expect(result).toEqual(mockUserRole);
      expect(service.update).toHaveBeenCalledWith('1', updateUserRoleInput);
    });
  });

  describe('removeUserRole', () => {
    it('should remove a user role', async () => {
      const result = await resolver.removeUserRole('1');
      expect(result).toEqual(mockUserRole);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
