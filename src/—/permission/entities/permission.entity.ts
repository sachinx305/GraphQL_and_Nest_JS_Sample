import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';

@ObjectType()
@Entity()
export class Permission {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [RolePermission], { nullable: true })
  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
  rolePermissions: RolePermission[];

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
