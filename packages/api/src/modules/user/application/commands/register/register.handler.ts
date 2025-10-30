import { LogService } from '@common/modules/log';
import { hashPassword } from '@common/utils';
import { AssetFacade } from '@modules/asset/application/facades';
import { AssetDirectory } from '@modules/asset/domain/enums';
import { UserRepository } from '@modules/user/infrastructure/persistence';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '@/modules/user/domain';
import { RegisterCommand } from './register.command';
import { RegisterResult } from './register.result';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand, RegisterResult> {
  constructor(private readonly userRepository: UserRepository,
    private readonly logger: LogService,
    private readonly assetFacade: AssetFacade) {
  }

  async execute(command: RegisterCommand): Promise<RegisterResult> {
    const existingUser = await this.userRepository.findByEmail(command.email);

    if (existingUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await hashPassword(command.password);

    let profileImageId: string | null = null;

    if (command.profileImage) {
      const uploadResult = await this.assetFacade.uploadAsset(command.profileImage,
        AssetDirectory.PROFILE_IMAGES,
        'public-read');

      profileImageId = uploadResult.id;
    }

    const user = UserEntity.create({
      name:     command.name,
      email:    command.email,
      password: hashedPassword,
      profileImageId,
    });

    await this.userRepository.create(user);

    this.logger.log('Auth', `User registered successfully (User ID: ${user.id})`);

    return RegisterResult.from({
      success: true,
      message: 'User registered successfully',
    });
  }
}
