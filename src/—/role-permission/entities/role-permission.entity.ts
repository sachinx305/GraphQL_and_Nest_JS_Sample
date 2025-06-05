import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';

@ObjectType()
@Entity()
export class RolePermission {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Role)
  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  role: Role;

  @Column()
  roleId: string;

  @Field(() => Permission)
  @ManyToOne(() => Permission, { onDelete: 'CASCADE' })
  permission: Permission;

  @Column()
  permissionId: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
