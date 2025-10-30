import { LogService } from '@common/modules/log';
import { AssetFacade } from '@modules/asset/application/facades';
import { AssetDirectory } from '@modules/asset/domain/enums';
import { UserRepository } from '@modules/user/infrastructure/persistence';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserUpdateCommand } from './user-update.command';

@CommandHandler(UserUpdateCommand)
export class UserUpdateHandler implements ICommandHandler<UserUpdateCommand, boolean> {
  constructor(private readonly userRepository: UserRepository,
    private readonly logger: LogService,
    private readonly assetFacade: AssetFacade) {
  }

  async execute(command: UserUpdateCommand): Promise<boolean> {
    const foundUser = await this.userRepository.findByIdOrThrow(command.userId);

    let profileImageId: string | null = foundUser.profileImageId;

    // profileImage가 null이면 아바타 삭제 요청
    if (command.profileImage === null) {
      if (foundUser.profileImageId) {
        await this.assetFacade.deleteAsset(foundUser.profileImageId);
      }

      profileImageId = null;
    } else if (command.profileImage) {
      // 새 이미지 업로드
      if (foundUser.profileImageId) {
        await this.assetFacade.deleteAsset(foundUser.profileImageId);
      }

      const uploadResult = await this.assetFacade.uploadAsset(command.profileImage,
        AssetDirectory.PROFILE_IMAGES,
        'public-read');

      profileImageId = uploadResult.id;
    }

    const updatedUser = foundUser.update({
      name: command.name ?? foundUser.name,
      profileImageId,
    });

    await this.userRepository.update(foundUser.id, updatedUser);

    return true;
  }
}
