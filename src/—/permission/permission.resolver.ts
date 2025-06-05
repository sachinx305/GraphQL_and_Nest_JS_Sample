import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permission } from './entities/permission.entity';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => Permission)
  createPermission(@Args('createPermissionInput') createPermissionInput: CreatePermissionInput) {
    return this.permissionService.create(createPermissionInput);
  }

  @Query(() => [Permission])
  findAllPermissions() {
    return this.permissionService.findAll();
  }

  @Query(() => Permission)
  findOnePermission(@Args('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @Mutation(() => Permission)
  updatePermission(@Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput) {
    return this.permissionService.update(updatePermissionInput.id, updatePermissionInput);
  }

  @Mutation(() => Permission)
  removePermission(@Args('id') id: string) {
    return this.permissionService.remove(id);
  }
}
