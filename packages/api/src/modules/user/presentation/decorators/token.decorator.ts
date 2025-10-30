import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const Token = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedException('토큰이 제공되지 않았습니다.');
  }

  return token;
});

