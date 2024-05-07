import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthDate: Date;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
