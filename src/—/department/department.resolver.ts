import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './entities/department.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  createDepartment(@Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput) {
    return this.departmentService.create(createDepartmentInput);
  }

  @Query(() => [Department])
  @UseGuards(GqlAuthGuard)
  findAllDepartment(@Args('organizationId') organizationId?: string) {
    return this.departmentService.findAll(organizationId);
  }

  @Query(() => Department)
  @UseGuards(GqlAuthGuard)
  findOneDepartment(@Args('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  updateDepartment(@Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput) {
    return this.departmentService.update(updateDepartmentInput.id, updateDepartmentInput);
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  removeDepartment(@Args('id') id: string) {
    return this.departmentService.remove(id);
  }
}
