import { S3Client } from '@aws-sdk/client-s3';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogModule } from '../log';
import { S3Service } from './s3.service';

export const S3_CLIENT = 'S3_CLIENT';

@Module({
  imports: [
    CacheModule.register(),
    LogModule,
    ConfigModule,
  ],
  providers: [
    {
      provide:    S3_CLIENT,
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          region:      configService.get<string>('S3_REGION'),
          credentials: {
            accessKeyId:     configService.get<string>('S3_ACCESS_KEY_ID') || '',
            secretAccessKey: configService.get<string>('S3_SECRET_ACCESS_KEY') || '',
          },
          endpoint:       configService.get<string>('S3_ENDPOINT') || '',
          forcePathStyle: true,
        });
      },
      inject: [ConfigService],
    },
    S3Service,
  ],
  exports: [S3_CLIENT, S3Service],
})
export class S3Module {
}
