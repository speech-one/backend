import { BasePromptEntity } from '@modules/base-prompt/domain/entities';
import { BasePromptRepositoryPort } from '@modules/base-prompt/domain/repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma';
import { BasePromptMapper } from '../mappers';

@Injectable()
export class BasePromptRepository implements BasePromptRepositoryPort {
  constructor(private readonly prisma: PrismaService) {
  }

  async findByUserId(userId: string): Promise<BasePromptEntity[]> {
    const basePrompts = await this.prisma.basePrompt.findMany({
      where:   { userId },
      orderBy: { id: 'asc' },
    });

    return BasePromptMapper.toDomainList(basePrompts);
  }

  async findById(id: string): Promise<BasePromptEntity | null> {
    const basePrompt = await this.prisma.basePrompt.findUnique({ where: { id } });

    if (!basePrompt) {
      return null;
    }

    return BasePromptMapper.toDomain(basePrompt);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.basePrompt.delete({ where: { id } });
  }

  async create(basePrompt: BasePromptEntity): Promise<BasePromptEntity> {
    const data = BasePromptMapper.toCreateInput(basePrompt);
    const row = await this.prisma.basePrompt.create({ data });

    return BasePromptMapper.toDomain(row);
  }
}

