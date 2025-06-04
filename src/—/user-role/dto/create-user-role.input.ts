import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserRoleInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  roleId: number;
}
