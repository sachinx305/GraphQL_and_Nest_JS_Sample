import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserRole {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  roleId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
