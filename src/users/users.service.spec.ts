import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create=> Should create a user and return the user details', async () => {
    // arrange
    const registerUserDto = {
      firstName: 'krishna',
      lastName: 'khanal',
      birthDate: new Date(),
      email: 'krishnaamen@gmail.com',
      username: 'krishnaamen',
      password: 'dummyPassword',
      role: 'user',
      vehicles: [] as Vehicle[],
    } as RegisterUserDto;

    const user = {
      id: Date.now(),
      firstName: 'krishna',
      lastName: 'khanal',
      birthDate: new Date(),
      email: 'krishnaamen@gmail.com',
      username: 'krishnaamen',
      password: 'dummyPassword',
      role: 'user',
      vehicles: [] as Vehicle[],
    } as User;

    jest.spyOn(mockUserRepository, 'save').mockResolvedValue(user);

    // act
    const result = service.create(registerUserDto);
    //assert
    expect(mockUserRepository.save).toBeCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(result).resolves.toEqual(user);
  });

  //it('findAll', () => {});
  it('findOne=> Should find a user by a given id and return its result', async () => {
    const id = 1;
    const user = {
      id: 1,
      firstname: 'Shuva',
      lastname: 'Khanal',
      email: 'sk@gmail.com',
    };

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    //act
    const result = await service.findOne(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockUserRepository.findOne).toBeCalledWith({ where: { id } });
  });
  // it('update', () => {});
  // it('remove', () => {});
});
