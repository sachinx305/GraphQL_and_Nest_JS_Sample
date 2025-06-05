import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRolePermissionInput {
  @Field()
  roleId: string;

  @Field()
  permissionId: string;
}
