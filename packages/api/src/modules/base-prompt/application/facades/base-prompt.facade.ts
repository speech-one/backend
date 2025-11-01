import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBasePromptCommand, CreateBasePromptResult } from '../commands';
import { DeleteBasePromptCommand } from '../commands';
import { ListBasePromptsQuery, ListBasePromptsResult } from '../queries';

@Injectable()
export class BasePromptFacade {
  constructor(private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  async list(userId: string): Promise<ListBasePromptsResult> {
    const query = ListBasePromptsQuery.from({ userId });

    return this.queryBus.execute<ListBasePromptsQuery, ListBasePromptsResult>(query);
  }

  async create(userId: string, prompt: string): Promise<CreateBasePromptResult> {
    const command = CreateBasePromptCommand.from({ userId, prompt });

    return this.commandBus.execute<CreateBasePromptCommand, CreateBasePromptResult>(command);
  }

  async delete(id: string, userId: string): Promise<void> {
    const command = DeleteBasePromptCommand.from({ id, userId });

    return this.commandBus.execute<DeleteBasePromptCommand, void>(command);
  }
}

