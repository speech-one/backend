import { S3Service } from '@common/modules/s3';
import { AssetRepository } from '@modules/asset/infrastructure/persistence';
import { UserRepository } from '@modules/user/infrastructure/persistence';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDetailQuery } from './user-detail.query';
import { UserDetailResult } from './user-detail.result';

@QueryHandler(UserDetailQuery)
export class UserDetailHandler implements IQueryHandler<UserDetailQuery, UserDetailResult> {
  constructor(private readonly userRepository: UserRepository,
    private readonly assetRepository: AssetRepository,
    private readonly s3Service: S3Service) {
  }

  async execute(query: UserDetailQuery): Promise<UserDetailResult> {
    const { id } = query;
    const user = await this.userRepository.findByIdOrThrow(id);

    let profileImageUrl: string | null = null;

    if (user.profileImageId) {
      const asset = await this.assetRepository.findById(user.profileImageId);

      if (asset) {
        profileImageUrl = this.s3Service.getPublicUrl(asset.key);
      }
    }

    return UserDetailResult.from({
      id:        user.id,
      name:      user.name,
      email:     user.email,
      profileImageUrl,
      status:    user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
