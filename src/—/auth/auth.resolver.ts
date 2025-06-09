import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('input') loginInput: LoginInput): Promise<string> {
    const user = await this.authService.validateUser(loginInput.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const token = await this.authService.login(user);
    return token.access_token;
  }
}
