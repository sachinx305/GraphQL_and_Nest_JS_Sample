import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionResolver } from './role-permission.resolver';
import { RolePermissionService } from './role-permission.service';

describe('RolePermissionResolver', () => {
  let resolver: RolePermissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolePermissionResolver, RolePermissionService],
    }).compile();

    resolver = module.get<RolePermissionResolver>(RolePermissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
