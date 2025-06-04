import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizationInput {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  address?: string;
}
