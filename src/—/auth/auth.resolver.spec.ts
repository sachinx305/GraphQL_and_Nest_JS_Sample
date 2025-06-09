import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token when user is valid', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
      };
      const mockToken = { access_token: 'test-token' };

      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue(mockToken);

      const result = await resolver.login({ email: 'test@example.com' });
      expect(result).toBe('test-token');
      expect(mockAuthService.validateUser).toHaveBeenCalledWith('test@example.com');
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
    });

    it('should throw UnauthorizedException when user is invalid', async () => {
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(resolver.login({ email: 'invalid@gmail.com' })).rejects.toThrow(UnauthorizedException);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith('invalid@gmail.com');
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });
  });
});
