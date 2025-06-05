import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';
import { RolePermission } from './entities/role-permission.entity';

@Resolver(() => RolePermission)
export class RolePermissionResolver {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Mutation(() => RolePermission)
  createRolePermission(@Args('createRolePermissionInput') createRolePermissionInput: CreateRolePermissionInput) {
    return this.rolePermissionService.create(createRolePermissionInput);
  }

  @Query(() => [RolePermission])
  findAllRolePermissions() {
    return this.rolePermissionService.findAll();
  }

  @Query(() => RolePermission)
  findOneRolePermission(@Args('id') id: string) {
    return this.rolePermissionService.findOne(id);
  }

  @Mutation(() => RolePermission)
  updateRolePermission(@Args('updateRolePermissionInput') updateRolePermissionInput: UpdateRolePermissionInput) {
    return this.rolePermissionService.update(updateRolePermissionInput.id, updateRolePermissionInput);
  }

  @Mutation(() => RolePermission)
  removeRolePermission(@Args('id') id: string) {
    return this.rolePermissionService.remove(id);
  }
}
