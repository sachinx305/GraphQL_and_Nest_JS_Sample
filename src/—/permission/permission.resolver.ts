import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permission } from './entities/permission.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => Permission)
  @UseGuards(GqlAuthGuard)
  createPermission(@Args('createPermissionInput') createPermissionInput: CreatePermissionInput) {
    return this.permissionService.create(createPermissionInput);
  }

  @Query(() => [Permission])
  @UseGuards(GqlAuthGuard)
  findAllPermissions() {
    return this.permissionService.findAll();
  }

  @Query(() => Permission)
  @UseGuards(GqlAuthGuard)
  findOnePermission(@Args('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @Mutation(() => Permission)
  @UseGuards(GqlAuthGuard)
  updatePermission(@Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput) {
    return this.permissionService.update(updatePermissionInput.id, updatePermissionInput);
  }

  @Mutation(() => Permission)
  @UseGuards(GqlAuthGuard)
  removePermission(@Args('id') id: string) {
    return this.permissionService.remove(id);
  }
}
