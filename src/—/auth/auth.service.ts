import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string) {
    // TODO: Implement user validation logic
    // For now, just returning a mock user
    if (email === 'invalid@gmail.com') {
      return null;
    }
    return {
      id: '1',
      email: 'test@example.com',
    };
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
