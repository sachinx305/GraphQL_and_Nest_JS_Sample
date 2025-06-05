import { Test, TestingModule } from '@nestjs/testing';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

describe('RoleResolver', () => {
  let resolver: RoleResolver;
  let service: RoleService;

  const mockRole = {
    id: '1',
    name: 'Test Role',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRoleService = {
    create: jest.fn().mockResolvedValue(mockRole),
    findAll: jest.fn().mockResolvedValue([mockRole]),
    findOne: jest.fn().mockResolvedValue(mockRole),
    update: jest.fn().mockResolvedValue(mockRole),
    remove: jest.fn().mockResolvedValue(mockRole),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleResolver,
        {
          provide: RoleService,
          useValue: mockRoleService,
        },
      ],
    }).compile();

    resolver = module.get<RoleResolver>(RoleResolver);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createRole', () => {
    it('should create a new role', async () => {
      const createRoleInput: CreateRoleInput = {
        name: 'Test Role',
        description: 'Test Description',
      };

      const result = await resolver.createRole(createRoleInput);
      expect(result).toEqual(mockRole);
      expect(service.create).toHaveBeenCalledWith(createRoleInput);
    });
  });

  describe('findAllRole', () => {
    it('should return an array of roles', async () => {
      const result = await resolver.findAllRole();
      expect(result).toEqual([mockRole]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneRole', () => {
    it('should return a role by id', async () => {
      const result = await resolver.findOneRole('1');
      expect(result).toEqual(mockRole);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateRole', () => {
    it('should update a role', async () => {
      const updateRoleInput: UpdateRoleInput = {
        id: '1',
        name: 'Updated Role',
      };

      const result = await resolver.updateRole(updateRoleInput);
      expect(result).toEqual(mockRole);
      expect(service.update).toHaveBeenCalledWith('1', updateRoleInput);
    });
  });

  describe('removeRole', () => {
    it('should remove a role', async () => {
      const result = await resolver.removeRole('1');
      expect(result).toEqual(mockRole);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
