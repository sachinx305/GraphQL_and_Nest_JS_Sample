import { Test, TestingModule } from '@nestjs/testing';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';

describe('TeamResolver', () => {
  let resolver: TeamResolver;
  let service: TeamService;

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

  const mockTeamService = {
    create: jest.fn().mockResolvedValue(mockTeam),
    findAll: jest.fn().mockResolvedValue([mockTeam]),
    findOne: jest.fn().mockResolvedValue(mockTeam),
    update: jest.fn().mockResolvedValue(mockTeam),
    remove: jest.fn().mockResolvedValue(mockTeam),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamResolver,
        {
          provide: TeamService,
          useValue: mockTeamService,
        },
      ],
    }).compile();

    resolver = module.get<TeamResolver>(TeamResolver);
    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createTeam', () => {
    it('should create a new team', async () => {
      const createTeamInput: CreateTeamInput = {
        name: 'Test Team',
        description: 'Test Description',
        departmentId: '1',
      };

      const result = await resolver.createTeam(createTeamInput);
      expect(result).toEqual(mockTeam);
      expect(service.create).toHaveBeenCalledWith(createTeamInput);
    });
  });

  describe('findAllTeam', () => {
    it('should return an array of teams', async () => {
      const result = await resolver.findAllTeam();
      expect(result).toEqual([mockTeam]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneTeam', () => {
    it('should return a team by id', async () => {
      const result = await resolver.findOneTeam('1');
      expect(result).toEqual(mockTeam);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateTeam', () => {
    it('should update a team', async () => {
      const updateTeamInput: UpdateTeamInput = {
        id: '1',
        name: 'Updated Team',
      };

      const result = await resolver.updateTeam(updateTeamInput);
      expect(result).toEqual(mockTeam);
      expect(service.update).toHaveBeenCalledWith('1', updateTeamInput);
    });
  });

  describe('removeTeam', () => {
    it('should remove a team', async () => {
      const result = await resolver.removeTeam('1');
      expect(result).toEqual(mockTeam);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
