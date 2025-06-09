import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamService.create(createTeamInput);
  }

  @Query(() => [Team])
  @UseGuards(GqlAuthGuard)
  findAllTeam(@Args('departmentId') departmentId?: string) {
    return this.teamService.findAll(departmentId);
  }

  @Query(() => Team)
  @UseGuards(GqlAuthGuard)
  findOneTeam(@Args('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamService.update(updateTeamInput.id, updateTeamInput);
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  removeTeam(@Args('id') id: string) {
    return this.teamService.remove(id);
  }
}
