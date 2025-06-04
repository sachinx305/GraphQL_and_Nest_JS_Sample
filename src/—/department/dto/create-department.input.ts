import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDepartmentInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  organizationId: string;
}
