import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@Injectable()
export class UsersService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async upgrade(userId: number) {
    const user = await this.findOne(userId); // Finding the user by the userId
    user.role = Role.PremiumUser; // Changing the role in memory.
    return this.userRepository.save(user); // Saving the updated user obj. into database
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    console.log('registerUserDto is there', registerUserDto);
    const { firstName, lastName, birthDate, email, username, password } =
      registerUserDto;

    const salt = await bcrypt.genSalt();
    console.log('salt is there', salt);
    console.log('password is there', password);

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('hashedPassword is there  ', hashedPassword);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;
    user.email = email;
    user.username = username;
    user.password = hashedPassword;
    user.role = Role.User;

    console.log('user from user service', user);
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
