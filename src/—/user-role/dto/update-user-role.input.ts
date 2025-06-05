import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateUserRoleInput } from './create-user-role.input';

@InputType()
export class UpdateUserRoleInput extends PartialType(CreateUserRoleInput) {
  @Field(() => ID)
  id: string;
}
