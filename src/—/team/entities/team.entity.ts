import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Department } from '../../department/entities/department.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Team {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Department)
  @ManyToOne(() => Department, { onDelete: 'CASCADE' })
  department: Department;

  @Field(() => [User])
  @OneToMany(() => User, user => user.team)
  users: User[];

  @Column()
  departmentId: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
