import { JwtPayload } from '@modules/user/domain/types/jwt-payload.type';
import { UserRepository } from '@modules/user/infrastructure/persistence';
import { UnauthorizedException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ValidateAccessTokenQuery } from './validate-access-token.query';
import { ValidateAccessTokenResult } from './validate-access-token.result';

@QueryHandler(ValidateAccessTokenQuery)
export class ValidateAccessTokenHandler implements IQueryHandler<ValidateAccessTokenQuery, ValidateAccessTokenResult> {
  constructor(private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository) {
  }

  async execute(query: ValidateAccessTokenQuery): Promise<ValidateAccessTokenResult> {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(query.accessToken);
    } catch {
      throw new UnauthorizedException('유효하지 않거나 만료된 액세스 토큰입니다.');
    }

    if (payload.type !== 'access') {
      throw new UnauthorizedException('유효하지 않은 토큰 타입입니다.');
    }

    const user = await this.userRepository.findByIdOrThrow(payload.sub);

    return ValidateAccessTokenResult.from({ user });
  }
}

