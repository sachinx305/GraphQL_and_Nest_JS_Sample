import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const mockUser = {
    id: '1',
    name: 'John Doe',
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

  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        teamId: '1',
      };

      const result = await resolver.createUser(createUserInput);
      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('findAllUser', () => {
    it('should return an array of users', async () => {
      const result = await resolver.findAllUser('1');
      expect(result).toEqual([mockUser]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneUser', () => {
    it('should return a user by id', async () => {
      const result = await resolver.findOneUser('1');
      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserInput: UpdateUserInput = {
        id: '1',
        name: 'Jane Doe',
      };

      const result = await resolver.updateUser(updateUserInput);
      expect(result).toEqual(mockUser);
      expect(service.update).toHaveBeenCalledWith('1', updateUserInput);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', async () => {
      const result = await resolver.removeUser('1');
      expect(result).toEqual(mockUser);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
