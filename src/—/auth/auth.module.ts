import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import * as fs from 'fs';
import { join } from 'path';

const privateKey = fs.readFileSync(join('./keys/private.key'));
const publicKey = fs.readFileSync(join('./keys/public.key'));

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey,
      publicKey,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}