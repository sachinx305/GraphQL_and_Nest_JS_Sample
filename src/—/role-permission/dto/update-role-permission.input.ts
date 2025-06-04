import { CreateRolePermissionInput } from './create-role-permission.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRolePermissionInput extends PartialType(CreateRolePermissionInput) {
  id: number;
}
