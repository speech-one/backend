import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ValidateAccessTokenQuery, ValidateAccessTokenResult } from '../application/queries';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService,
    private readonly queryBus: QueryBus) {
    super({
      jwtFromRequest:    ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:  false,
      secretOrKey:       configService.get<string>('JWT_SECRET') || '',
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('인증 헤더 누락 또는 유효하지 않음');
    }

    const token = authHeader.split(' ')[1];
    const result = await this.queryBus.execute<ValidateAccessTokenQuery, ValidateAccessTokenResult>(ValidateAccessTokenQuery.from({ accessToken: token }));

    return result.user;
  }
}
