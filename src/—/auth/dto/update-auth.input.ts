import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateAuthInput } from './create-auth.input';

@InputType()
export class UpdateAuthInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}
