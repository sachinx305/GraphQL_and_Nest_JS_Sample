import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTeamInput } from './create-team.input';

@InputType()
export class UpdateTeamInput extends PartialType(CreateTeamInput) {
  @Field(() => ID)
  id: string;
}
