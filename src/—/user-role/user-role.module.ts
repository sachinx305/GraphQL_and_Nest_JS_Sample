import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleResolver } from './user-role.resolver';

@Module({
  providers: [UserRoleResolver, UserRoleService],
})
export class UserRoleModule {}
