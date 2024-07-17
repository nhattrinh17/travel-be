import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Status } from 'src/constants';
import { RedisService } from '../../cache/redis.service';
import { UsersService } from 'src/modules/users/users.service';

interface JwtPayload {
  email: string;
  id: number;
  tenantId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService, private readonly cacheService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    let user = JSON.parse(await this.cacheService.get(`${process.env.APP_ID}:${process.env.APP_NAME}:${payload.id}`));

    if (!user) {
      user = await this.userService.findOne(payload.id);
      if (user) {
        user = JSON.parse(JSON.stringify(user));
        await this.cacheService.set(`${process.env.APP_ID}:${process.env.APP_NAME}:${payload.id}`, JSON.stringify(user), 60 * 30);
      } else {
        return null;
      }
    }
    if (user && user.status !== Status.Active) return null;
    return {
      ...user,
    };
  }
}
