import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import * as fs from 'fs';
import { join } from 'path';


const privateKey = fs.readFileSync(join('./keys/private.key'));
const publicKey = fs.readFileSync(join('./keys/public.key'));

@Module({
  imports: [
    JwtModule.register({
      privateKey,
      publicKey,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}