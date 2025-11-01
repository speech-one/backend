import { BasePromptEntity } from '@modules/base-prompt/domain/entities';
import type { BasePrompt, Prisma } from '@speech-one/database';

export class BasePromptMapper {
  static toDomain(basePrompt: BasePrompt): BasePromptEntity {
    return BasePromptEntity.from(basePrompt);
  }

  static toDomainList(basePrompts: BasePrompt[]): BasePromptEntity[] {
    return basePrompts.map(basePrompt => this.toDomain(basePrompt));
  }

  static toCreateInput(basePrompt: BasePromptEntity): Prisma.BasePromptCreateInput {
    return {
      user:   { connect: { id: basePrompt.userId } },
      prompt: basePrompt.prompt,
    };
  }
}

