import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(logInDto: LogInDto) {
    const { email, password } = logInDto;
    const user = await this.usersService.findByEmail(email);
    console.log('user from service', user);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordIsValid = await user.validatePassword(password);

    console.log('hit1');

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    console.log('user.id auth service', user.id);
    const payload = { id: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken);
    return { access_token: accessToken };
  }

  async signup(signupdto: RegisterUserDto) {
    console.log('sign-updto', signupdto);
    return this.usersService.create(signupdto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
