import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateRolePermissionInput } from './create-role-permission.input';

@InputType()
export class UpdateRolePermissionInput extends PartialType(CreateRolePermissionInput) {
  @Field(() => ID)
  id: string;
}
