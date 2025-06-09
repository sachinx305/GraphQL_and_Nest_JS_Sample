import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { UserRole } from './entities/user-role.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserRole)
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Mutation(() => UserRole)
  @UseGuards(GqlAuthGuard)
  createUserRole(@Args('createUserRoleInput') createUserRoleInput: CreateUserRoleInput) {
    return this.userRoleService.create(createUserRoleInput);
  }

  @Query(() => [UserRole])
  @UseGuards(GqlAuthGuard)
  findAllUserRole(@Args('userId', { nullable: true }) userId?: string, @Args('roleId', { nullable: true }) roleId?: string) {
    return this.userRoleService.findAll(userId, roleId);
  }

  @Query(() => UserRole)
  @UseGuards(GqlAuthGuard)
  findOneUserRole(@Args('id') id: string) {
    return this.userRoleService.findOne(id);
  }

  @Mutation(() => UserRole)
  @UseGuards(GqlAuthGuard)
  updateUserRole(@Args('updateUserRoleInput') updateUserRoleInput: UpdateUserRoleInput) {
    return this.userRoleService.update(updateUserRoleInput.id, updateUserRoleInput);
  }

  @Mutation(() => UserRole)
  @UseGuards(GqlAuthGuard)
  removeUserRole(@Args('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
