import { BasePromptRepository } from '@modules/base-prompt/infrastructure/persistence';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BasePromptEntity } from '@modules/base-prompt/domain/entities';
import { CreateBasePromptCommand } from './create-base-prompt.command';
import { CreateBasePromptResult } from './create-base-prompt.result';

@CommandHandler(CreateBasePromptCommand)
export class CreateBasePromptHandler implements ICommandHandler<CreateBasePromptCommand, CreateBasePromptResult> {
  constructor(private readonly basePromptRepository: BasePromptRepository) {
  }

  async execute(command: CreateBasePromptCommand): Promise<CreateBasePromptResult> {
    const basePrompt = BasePromptEntity.from({
      id:     '', // Prisma가 자동 생성
      userId: command.userId,
      prompt: command.prompt,
    });

    const created = await this.basePromptRepository.create(basePrompt);

    return CreateBasePromptResult.from({
      id:     created.id,
      prompt: created.prompt,
    });
  }
}

