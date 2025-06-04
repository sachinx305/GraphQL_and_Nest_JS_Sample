import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  address: string;
}
