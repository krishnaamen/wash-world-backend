// test/auth.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';
import { VehicleService } from '../src/vehicle/vehicle.service';
import { RegisterUserDto } from '../src/users/dto/register-user.dto';
import {
  mockRepositories,
  userRepositoryToken,
  vehicleRepositoryToken,
} from './mock-repository';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let usersService: UsersService;
  let authService: AuthService;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(userRepositoryToken)
      .useValue(mockRepositories[userRepositoryToken.toString()])
      .overrideProvider(vehicleRepositoryToken)
      .useValue(mockRepositories[vehicleRepositoryToken.toString()]) // Fix: Change index type from Function to string
      .compile();

    usersService = moduleFixture.get(UsersService);
    authService = moduleFixture.get(AuthService);
    vehicleService = moduleFixture.get(VehicleService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Signup', () => {
    it('should create a user', async () => {
      const registerUserDto: RegisterUserDto = {
        firstName: 'Krishna',
        lastName: 'Khanal',
        birthDate: '1999-12-12',
        email: 'krishnaamen@gmail.com',
        username: 'krishnaamen',
        password: 'kri123',
      };

      const mockUser = { ...registerUserDto, id: 1, role: 'user' };
      (
        mockRepositories[userRepositoryToken.toString()].save as jest.Mock
      ).mockResolvedValue(mockUser);

      const { body } = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(registerUserDto)
        .expect(201);

      console.log('body ......', body);

      expect(body.email).toEqual('krishnaamen@gmail.com');
      expect(body.role).toEqual('user');
      expect(body.id).toBeDefined();
    });
  });

  describe('Login', () => {
    it('should login and get a token', async () => {
      const registerUserDto: RegisterUserDto = {
        firstName: 'Krishna',
        lastName: 'Khanal',
        birthDate: '1999-12-12',
        email: 'krishnaamen@gmail.com',
        username: 'krishnaamen',
        password: 'kri123',
      };
      const mockUser = {
        ...registerUserDto,
        id: 1,
        role: 'user',
        validatePassword: jest.fn().mockResolvedValue(true),
      };
      (
        mockRepositories[userRepositoryToken.toString()].findOne as jest.Mock
      ).mockResolvedValue(mockUser);

      const login = { email: 'krishnaamen@gmail.com', password: 'kri123' };
      // Act
      const { body } = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(login)
        .expect(201);

      expect(body.access_token).toBeDefined();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
