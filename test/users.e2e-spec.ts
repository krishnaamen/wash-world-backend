import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';
import { log } from 'console';

describe('ProblemController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let usersRepository: Repository<User>;

  let usersService: UsersService;
  let authService: AuthService;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleFixture.get(UsersService);
    authService = moduleFixture.get(AuthService);
    usersRepository = moduleFixture.get(getRepositoryToken(User));
    await usersRepository.query('DELETE FROM entry');
    await usersRepository.query('DELETE FROM user_entity');

    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Register User', () => {
    it('should create a user', async () => {
      const user = {
        firstName: 'Krishna',
        lastName: 'Khanal',
        dateOfBirth: '1999-12-12',
        email: 'Krishnaamen@gmail.com',
        password: 'kri123',
      };
      // Act
      const { body } = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user)
        .expect(201);

      //   console.log(body);

      expect(body.username).toEqual('krishnaamen');
      expect(body.role).toEqual('user');
      expect(body.id).toBeDefined();
    });
  });

  //   describe('Login', () => {
  //     it('should login and get a token', async () => {
  //       const createdUser = await usersService.create(firstName: 'Krishna',
  //       lastName: 'Khanal',
  //       dateOfBirth: '1999-12-12',
  //       email: 'Krishnaamen@gmail.com',
  //       password: 'kri123');

  //       const login = { email: 'Krishnaamen@gmail.com', password: 'kri123' };
  //       // Act
  //       const { body } = await request(app.getHttpServer())
  //         .post('/auth/login')
  //         .send(login)
  //         .expect(201);

  //       expect(body.access_token).toBeDefined();
  //     });
  //   });
});
