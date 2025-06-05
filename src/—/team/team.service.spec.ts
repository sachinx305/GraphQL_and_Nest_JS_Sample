import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamService } from './team.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';

describe('TeamService', () => {
  let service: TeamService;
  let repository: Repository<Team>;

  const mockTeam = {
    id: '1',
    name: 'Test Team',
    description: 'Test Description',
    departmentId: '1',
    department: {
      id: '1',
      name: 'Test Department',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((team) => Promise.resolve({ ...team, id: '1' })),
    find: jest.fn().mockResolvedValue([mockTeam]),
    findOne: jest.fn().mockResolvedValue(mockTeam),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
    repository = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new team', async () => {
      const createTeamInput: CreateTeamInput = {
        name: 'Test Team',
        description: 'Test Description',
        departmentId: '1',
      };

      const result = await service.create(createTeamInput);
      expect(result).toEqual(mockTeam);
      expect(repository.create).toHaveBeenCalledWith(createTeamInput);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of teams', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockTeam]);
      expect(repository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
        where: {},
        relations: ['department', 'users', 'department.organization', 'users.userRoles', 'users.userRoles.role', 'users.userRoles.role.rolePermissions', 'users.userRoles.role.rolePermissions.permission'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a team by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockTeam);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['department', 'users', 'department.organization', 'users.userRoles', 'users.userRoles.role', 'users.userRoles.role.rolePermissions', 'users.userRoles.role.rolePermissions.permission'],
      });
    });

    it('should throw an error if team not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('1')).rejects.toThrow('Team not found');
    });
  });

  describe('update', () => {
    it('should update a team', async () => {
      const updateTeamInput: UpdateTeamInput = {
        id: '1',
        name: 'Updated Team',
        description: 'Updated Description',
      };

      const result = await service.update('1', updateTeamInput);
      expect(result.name).toEqual(updateTeamInput.name);
      expect(result.description).toEqual(updateTeamInput.description);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['department', 'users', 'department.organization', 'users.userRoles', 'users.userRoles.role', 'users.userRoles.role.rolePermissions', 'users.userRoles.role.rolePermissions.permission'],
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a team', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockTeam);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
