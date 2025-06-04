import { ObjectType, Field } from '@nestjs/graphql';
import { Organization } from '../entities/organization.entity';

@ObjectType()
export class PaginatedOrganizationResponse {
  @Field(() => [Organization])
  organizations: Organization[];

  @Field(() => Number)
  total: number;
} 