import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserRoleInput {
  @Field()
  userId: string;

  @Field()
  roleId: string;
}
