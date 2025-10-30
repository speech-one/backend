import { BasePromptRepository } from '@modules/base-prompt/infrastructure/persistence';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListBasePromptsQuery } from './list-base-prompts.query';
import { ListBasePromptsResult } from './list-base-prompts.result';

@QueryHandler(ListBasePromptsQuery)
export class ListBasePromptsHandler implements IQueryHandler<ListBasePromptsQuery, ListBasePromptsResult> {
  constructor(private readonly basePromptRepository: BasePromptRepository) {
  }

  async execute(query: ListBasePromptsQuery): Promise<ListBasePromptsResult> {
    const { userId } = query;
    const basePrompts = await this.basePromptRepository.findByUserId(userId);

    return ListBasePromptsResult.from({
      basePrompts: basePrompts.map(bp => ({
        id:     bp.id,
        prompt: bp.prompt,
      })),
    });
  }
}

