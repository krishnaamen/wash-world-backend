import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Not the best practice, we should ideally have this coming as an
      // environment variable and outside of Git.
      secretOrKey: process,
    });
  }

  async validate(payload: any) {
    console.log('payload jwt.strategy', payload);
    return {
      id: payload.id,
      username: payload.username,
    };
  }
}
