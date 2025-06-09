import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a mock user for now', async () => {
      const result = await service.validateUser('test@example.com');
      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
      });
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
      };

      const result = await service.login(mockUser);
      expect(result).toEqual({
        access_token: 'test-token',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
    });
  });
});
