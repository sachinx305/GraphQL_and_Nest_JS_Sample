import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createTeamInput: CreateTeamInput): Promise<Team> {
    const team = this.teamRepository.create(createTeamInput);
    let newTeam = await this.teamRepository.save(team);
    return await this.findOne(newTeam.id);
  }

  async findAll(departmentId?: string): Promise<Team[]> {
    const where = departmentId ? { departmentId } : {};
    return this.teamRepository.find({
      where,
      relations: ['department', 'users', 'department.organization', 'users.userRoles', 'users.userRoles.role'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['department', 'users', 'department.organization', 'users.userRoles', 'users.userRoles.role'],
    });
    if (!team) throw new Error('Team not found');
    return team;
  }

  async update(id: string, updateTeamInput: UpdateTeamInput): Promise<Team> {
    await this.teamRepository.update(id, updateTeamInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Team> {
    const team = await this.findOne(id);
    if (team.users && team.users.length > 0) {
      throw new BadRequestException('Cannot delete team with existing users. Please delete all users first.');
    }
    await this.teamRepository.delete(id);
    return { ...team, id };
  }
}
