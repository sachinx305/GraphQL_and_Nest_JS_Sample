import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Int, { nullable: true })
  roleId?: number;
}
