import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';
import { VehicleService } from '../src/vehicle/vehicle.service';
import { RegisterUserDto } from '../src/users/dto/register-user.dto';
import { Vehicle } from '../src/vehicle/entities/vehicle.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let usersRepository: Repository<User>;
  let vehicleRepository: Repository<Vehicle>;
  let usersService: UsersService;
  let authService: AuthService;
  let vehicleService: VehicleService;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleFixture.get(UsersService);
    authService = moduleFixture.get(AuthService);
    vehicleService = moduleFixture.get(VehicleService);
    usersRepository = moduleFixture.get(getRepositoryToken(User));
    vehicleRepository = moduleFixture.get(getRepositoryToken(Vehicle));

    await usersRepository.query('DELETE FROM "user"');
    await vehicleRepository.query('DELETE FROM "vehicle"');

    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Signup', () => {
    it('should create a user', async () => {
      const registerUserDto: RegisterUserDto = {
        firstName: 'Krishna',
        lastName: 'Khanal',
        birthDate: new Date('1999-12-12'),
        email: 'krishnaamen@gmail.com',
        username: 'krishnaamen',
        password: 'kri123',
      };

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
        birthDate: new Date('1999-12-12'),
        email: 'krishnaamen@gmail.com',
        username: 'krishnaamen',
        password: 'kri123',
      };
      const registerUser = await usersService.create(registerUserDto);
      console.log('registerUser', registerUser);

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
    await connection.close();
    await app.close();
  });
});
