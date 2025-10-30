import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@/common/modules/prisma';
import { UserModule } from '@/modules/user';
import { DeleteBasePromptHandler } from './application/commands';
import { BasePromptFacade } from './application/facades';
import { ListBasePromptsHandler } from './application/queries';
import { OwnershipGuard } from './infrastructure/guards';
import { BasePromptRepository } from './infrastructure/persistence';
import { BasePromptController } from './presentation/controllers';

const CommandHandlers = [DeleteBasePromptHandler];
const QueryHandlers = [ListBasePromptsHandler];

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    UserModule,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    BasePromptFacade,
    BasePromptRepository,
    OwnershipGuard,
  ],
  controllers: [BasePromptController],
  exports:     [BasePromptFacade],
})
export class BasePromptModule {
}
