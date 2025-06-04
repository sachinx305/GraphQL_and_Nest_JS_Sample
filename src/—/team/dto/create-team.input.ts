import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  departmentId: string;
}
