import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  @UseGuards(GqlAuthGuard)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [Role])
  @UseGuards(GqlAuthGuard)
  findAllRole() {
    return this.roleService.findAll();
  }

  @Query(() => Role)
  @UseGuards(GqlAuthGuard)
  findOneRole(@Args('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role)
  @UseGuards(GqlAuthGuard)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Role)
  @UseGuards(GqlAuthGuard)
  removeRole(@Args('id') id: string) {
    return this.roleService.remove(id);
  }
}
