import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { LogInDto } from './dto/log-in.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    console.log('registerUserDto', registerUserDto);
    return this.usersService.create(registerUserDto);
  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() logInDto: LogInDto) {
    console.log('logInDto', logInDto);
    return this.authService.signIn(logInDto);
  }
}
