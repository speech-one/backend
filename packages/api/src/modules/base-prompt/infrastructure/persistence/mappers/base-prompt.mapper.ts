import { BasePromptEntity } from '@modules/base-prompt/domain/entities';
import type { BasePrompt } from '@speech-one/database';

export class BasePromptMapper {
  static toDomain(basePrompt: BasePrompt): BasePromptEntity {
    return BasePromptEntity.from(basePrompt);
  }

  static toDomainList(basePrompts: BasePrompt[]): BasePromptEntity[] {
    return basePrompts.map(basePrompt => this.toDomain(basePrompt));
  }
}

