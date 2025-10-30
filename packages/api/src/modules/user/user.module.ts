import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '@/common/modules/prisma';
import { RedisModule } from '@/common/modules/redis';
import { S3Module } from '@/common/modules/s3';
import { AssetModule } from '@/modules/asset';
import { LoginHandler, LogoutHandler, RegisterHandler } from './application/commands';
import { RefreshTokenHandler } from './application/commands/refresh-token/refresh-token.handler';
import { UserUpdateHandler } from './application/commands/user-update';
import { AuthFacade, UserFacade } from './application/facades';
import { UserDetailHandler, ValidateAccessTokenHandler } from './application/queries';
import { JwtAuthGuard } from './infrastructure/guards';
import { UserRepository } from './infrastructure/persistence';
import { AuthController, UserController } from './presentation/controllers';
import { JwtStrategy } from './strategy/jwt.strategy';

const CommandHandlers = [
  LoginHandler,
  LogoutHandler,
  RefreshTokenHandler,
  RegisterHandler,
  UserUpdateHandler,
];

const QueryHandlers = [ValidateAccessTokenHandler, UserDetailHandler];

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    PassportModule,
    PrismaModule,
    RedisModule,
    AssetModule,
    S3Module,
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      useFactory: (configService: ConfigService) => ({ secret: configService.get<string>('JWT_SECRET') }),
      inject:     [ConfigService],
    }),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    AuthFacade,
    UserFacade,
    JwtStrategy,
    JwtAuthGuard,
    UserRepository,
  ],
  controllers: [AuthController, UserController],
  exports:     [
    AuthFacade, JwtModule, JwtAuthGuard,
  ],
})
export class UserModule {
}
