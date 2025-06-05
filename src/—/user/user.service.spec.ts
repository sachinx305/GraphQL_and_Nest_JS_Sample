import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashedPassword',
    teamId: '1',
    team: {
      id: '1',
      name: 'Test Team',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ ...user, id: '1' })),
    find: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        teamId: '1',
      };

      const result = await service.create(createUserInput);
      expect(result).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith(createUserInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
      expect(repository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
        where: {},
        relations: ['team', 'team.department', 'team.department.organization', 'userRoles', 'userRoles.role', 'userRoles.role.rolePermissions', 'userRoles.role.rolePermissions.permission'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['team', 'team.department', 'team.department.organization', 'userRoles', 'userRoles.role', 'userRoles.role.rolePermissions', 'userRoles.role.rolePermissions.permission'],
      });
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserInput: UpdateUserInput = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      };

      const result = await service.update('1', updateUserInput);
      expect(result.name).toEqual(updateUserInput.name);
      expect(result.email).toEqual(updateUserInput.email);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['team', 'team.department', 'team.department.organization', 'userRoles', 'userRoles.role', 'userRoles.role.rolePermissions', 'userRoles.role.rolePermissions.permission'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockUser);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
