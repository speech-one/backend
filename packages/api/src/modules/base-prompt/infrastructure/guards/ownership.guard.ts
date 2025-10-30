import { BasePromptRepository } from '@modules/base-prompt/infrastructure/persistence';
import { UserEntity } from '@modules/user/domain/entities';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly basePromptRepository: BasePromptRepository) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    const basePromptId = request.params.id;

    if (!user) {
      throw new ForbiddenException('인증이 필요합니다.');
    }

    const basePrompt = await this.basePromptRepository.findById(basePromptId);

    if (!basePrompt) {
      throw new NotFoundException('Base prompt를 찾을 수 없습니다.');
    }

    if (basePrompt.userId !== user.id) {
      throw new ForbiddenException('자신의 base prompt만 삭제할 수 있습니다.');
    }

    return true;
  }
}

