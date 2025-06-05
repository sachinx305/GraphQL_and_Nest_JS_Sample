import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { UserRole } from './entities/user-role.entity';

@Resolver(() => UserRole)
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Mutation(() => UserRole)
  createUserRole(@Args('createUserRoleInput') createUserRoleInput: CreateUserRoleInput) {
    return this.userRoleService.create(createUserRoleInput);
  }

  @Query(() => [UserRole])
  findAllUserRole(@Args('userId', { nullable: true }) userId?: string, @Args('roleId', { nullable: true }) roleId?: string) {
    return this.userRoleService.findAll(userId, roleId);
  }

  @Query(() => UserRole)
  findOneUserRole(@Args('id') id: string) {
    return this.userRoleService.findOne(id);
  }

  @Mutation(() => UserRole)
  updateUserRole(@Args('updateUserRoleInput') updateUserRoleInput: UpdateUserRoleInput) {
    return this.userRoleService.update(updateUserRoleInput.id, updateUserRoleInput);
  }

  @Mutation(() => UserRole)
  removeUserRole(@Args('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
