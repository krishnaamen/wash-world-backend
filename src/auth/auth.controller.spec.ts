import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LogInDto } from './dto/log-in.dto';
import { User } from '../users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('test', () => {
    it('should return "test"', async () => {
      const result = await controller.test();
      expect(result).toBe('test');
    });
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const registerUserDto: RegisterUserDto = {
        firstName: '',
        lastName: '',
        birthDate: undefined,
        email: '',
        username: '',
        password: '',
      };

      const createSpy = jest
        .spyOn(usersService, 'create')
        .mockResolvedValue(registerUserDto as User); // Cast registerUserDto to User

      const result = await controller.signUp(registerUserDto);

      expect(createSpy).toHaveBeenCalledWith(registerUserDto);
      expect(result).toBe(registerUserDto);
    });
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const logInDto: LogInDto = {
        email: '',
        password: '',
      };

      const signInResult = {
        access_token: 'fakeToken',
        username: 'fakeUsername',
      };

      const signInSpy = jest
        .spyOn(authService, 'signIn')
        .mockResolvedValue(signInResult);

      const result = await controller.signIn(logInDto);

      expect(signInSpy).toHaveBeenCalledWith(logInDto);
      expect(result).toBe(signInResult);
    });
  });
});
