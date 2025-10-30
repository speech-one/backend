import { BasePromptEntity } from '../entities';

export interface BasePromptRepositoryPort {
  findByUserId(userId: string): Promise<BasePromptEntity[]>;

  findById(id: string): Promise<BasePromptEntity | null>;

  delete(id: string): Promise<void>;
}

