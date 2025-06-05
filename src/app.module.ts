import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './—/auth/auth.module';
import { OrganizationModule } from './—/organization/organization.module';
import { DepartmentModule } from './—/department/department.module';
import { TeamModule } from './—/team/team.module';
import { UserModule } from './—/user/user.module';
import { RoleModule } from './—/role/role.module';
import { UserRoleModule } from './—/user-role/user-role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './—/organization/entities/organization.entity';
import { Department } from './—/department/entities/department.entity';
import { Team } from './—/team/entities/team.entity';
import { User } from './—/user/entities/user.entity';
import { Role } from './—/role/entities/role.entity';
import { UserRole } from './—/user-role/entities/user-role.entity';
import { PermissionModule } from './—/permission/permission.module';
import { Permission } from './—/permission/entities/permission.entity';

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'postgres',
      entities: [Organization, Department, Team, User, Role, UserRole, Permission],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
    }),
    AuthModule,
    OrganizationModule,
    DepartmentModule,
    TeamModule,
    UserModule,
    RoleModule,
    UserRoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
