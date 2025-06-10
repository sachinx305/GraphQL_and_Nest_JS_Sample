import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { RolePermission } from './—/role-permission/entities/role-permission.entity';
import { RolePermissionModule } from './—/role-permission/role-permission.module';
import { AuthModule } from './—/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OrganizationModule,
    DepartmentModule,
    TeamModule,
    UserModule,
    RoleModule,
    UserRoleModule,
    PermissionModule,
    RolePermissionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
