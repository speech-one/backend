import { BasePromptRepository } from '@modules/base-prompt/infrastructure/persistence';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBasePromptCommand } from './delete-base-prompt.command';

@CommandHandler(DeleteBasePromptCommand)
export class DeleteBasePromptHandler implements ICommandHandler<DeleteBasePromptCommand, boolean> {
  constructor(private readonly basePromptRepository: BasePromptRepository) {
  }

  async execute(command: DeleteBasePromptCommand): Promise<boolean> {
    await this.basePromptRepository.delete(command.id);

    return true;
  }
}

