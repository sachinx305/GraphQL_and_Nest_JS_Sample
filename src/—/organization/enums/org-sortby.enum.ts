import { registerEnumType } from '@nestjs/graphql';

export enum OrgSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

registerEnumType(OrgSortBy, {
  name: 'OrgSortBy',
  description: 'Sort by: NAME, CREATED_AT, UPDATED_AT',
});
