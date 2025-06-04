import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionResolver } from './role-permission.resolver';

@Module({
  providers: [RolePermissionResolver, RolePermissionService],
})
export class RolePermissionModule {}
