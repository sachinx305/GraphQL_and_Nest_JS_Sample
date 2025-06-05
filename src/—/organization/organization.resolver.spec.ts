import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver;
  let service: OrganizationService;

  const mockOrganization = {
    id: '1',
    name: 'Test Organization',
    description: 'Test Description',
    address: 'Test Address',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOrganizationService = {
    create: jest.fn().mockResolvedValue(mockOrganization),
    findAll: jest.fn().mockResolvedValue([mockOrganization]),
    findOne: jest.fn().mockResolvedValue(mockOrganization),
    update: jest.fn().mockResolvedValue(mockOrganization),
    remove: jest.fn().mockResolvedValue(mockOrganization),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationResolver,
        {
          provide: OrganizationService,
          useValue: mockOrganizationService,
        },
      ],
    }).compile();

    resolver = module.get<OrganizationResolver>(OrganizationResolver);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createOrganization', () => {
    it('should create a new organization', async () => {
      const createOrganizationInput: CreateOrganizationInput = {
        name: 'Test Organization',
        description: 'Test Description',
        address: 'Test Address',
      };

      const result = await resolver.createOrganization(createOrganizationInput);
      expect(result).toEqual(mockOrganization);
      expect(service.create).toHaveBeenCalledWith(createOrganizationInput);
    });
  });

  describe('findAllOrganization', () => {
    it('should return an array of organizations', async () => {
      const result = await resolver.findAllOrganization();
      expect(result).toEqual([mockOrganization]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneOrganization', () => {
    it('should return an organization by id', async () => {
      const result = await resolver.findOneOrganization('1');
      expect(result).toEqual(mockOrganization);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('updateOrganization', () => {
    it('should update an organization', async () => {
      const updateOrganizationInput: UpdateOrganizationInput = {
        id: '1',
        name: 'Updated Organization',
      };

      const result = await resolver.updateOrganization(updateOrganizationInput);
      expect(result).toEqual(mockOrganization);
      expect(service.update).toHaveBeenCalledWith('1', updateOrganizationInput);
    });
  });

  describe('removeOrganization', () => {
    it('should remove an organization', async () => {
      const result = await resolver.removeOrganization('1');
      expect(result).toEqual(mockOrganization);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
