import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization } from './entities/organization.entity';
import { SortOrder } from './enums/sort-order.enum';
import { OrgSortBy } from './enums/org-sortby.enum';
import { PaginatedOrganizationResponse } from './dto/paginated-organization.response';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Mutation(() => Organization)
  createOrganization(@Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput) {
    return this.organizationService.create(createOrganizationInput);
  }

  @Query(() => PaginatedOrganizationResponse)
  findAllOrganization(@Args('page') page?: number, @Args('limit') limit?: number, @Args('sortBy') sortBy?: OrgSortBy, @Args('sortOrder') sortOrder?: SortOrder) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    if (!sortBy) sortBy = OrgSortBy.CREATED_AT;
    if (!sortOrder) sortOrder = SortOrder.DESC;
    return this.organizationService.findAll(page, limit, sortBy, sortOrder);
  }

  @Query(() => Organization)
  findOneOrganization(@Args('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Mutation(() => Organization)
  updateOrganization(@Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput) {
    return this.organizationService.update(updateOrganizationInput.id, updateOrganizationInput);
  }

  @Mutation(() => Organization)
  removeOrganization(@Args('id') id: string) {
    return this.organizationService.remove(id);
  }
}
