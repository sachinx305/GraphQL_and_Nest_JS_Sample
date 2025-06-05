import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
// import { UserRoleService } from 'src/—/user-role/user-role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // private userRoleService: UserRoleService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    let newUser = await this.userRepository.save(user);
    // newUser.userRoles = await this.userRoleService.findAll(newUser.id);
    return await this.findOne(newUser.id);
  }

  async findAll(teamId?: string): Promise<User[]> {
    const where = teamId ? { teamId } : {};
    return this.userRepository.find({
      where,
      relations: ['team', 'team.department', 'team.department.organization', 'userRoles', 'userRoles.role'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['team', 'team.department', 'team.department.organization', 'userRoles', 'userRoles.role'],
    });
    if (!user) throw new Error('User not found');
    // user.userRoles = await this.userRoleService.findAll(user.id);
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, updateUserInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return user;
  }
}
