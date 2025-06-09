import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';
import { RolePermission } from './entities/role-permission.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => RolePermission)
export class RolePermissionResolver {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Mutation(() => RolePermission)
  @UseGuards(GqlAuthGuard)
  createRolePermission(@Args('createRolePermissionInput') createRolePermissionInput: CreateRolePermissionInput) {
    return this.rolePermissionService.create(createRolePermissionInput);
  }

  @Query(() => [RolePermission])
  @UseGuards(GqlAuthGuard)
  findAllRolePermissions() {
    return this.rolePermissionService.findAll();
  }

  @Query(() => RolePermission)
  @UseGuards(GqlAuthGuard)
  findOneRolePermission(@Args('id') id: string) {
    return this.rolePermissionService.findOne(id);
  }

  @Mutation(() => RolePermission)
  @UseGuards(GqlAuthGuard)
  updateRolePermission(@Args('updateRolePermissionInput') updateRolePermissionInput: UpdateRolePermissionInput) {
    return this.rolePermissionService.update(updateRolePermissionInput.id, updateRolePermissionInput);
  }

  @Mutation(() => RolePermission)
  @UseGuards(GqlAuthGuard)
  removeRolePermission(@Args('id') id: string) {
    return this.rolePermissionService.remove(id);
  }
}
