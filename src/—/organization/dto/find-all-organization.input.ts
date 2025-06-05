import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { SortOrder } from '../../common/dto/sort-order.input';

export enum OrgSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

@InputType()
export class FindAllOrganizationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Field(() => OrgSortBy, { defaultValue: OrgSortBy.CREATED_AT })
  @IsEnum(OrgSortBy)
  @IsOptional()
  sortBy?: OrgSortBy = OrgSortBy.CREATED_AT;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.DESC;
} 