import { PrismaModule } from '@/common/modules/prisma';
import { UserModule } from '@/modules/user';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateMcpHandler, DeleteMcpHandler, UpdateMCPServerHandler } from './application/commands';
import { MCPFacade } from './application/facades';
import { GetMCPServerHandler, ListMCPServersHandler } from './application/queries';
import { McpOwnershipGuard } from './infrastructure/guards';
import { MCPServerRepository } from './infrastructure/persistence';
import { MCPController } from './presentation/controllers';

const CommandHandlers = [CreateMcpHandler, DeleteMcpHandler, UpdateMCPServerHandler];
const QueryHandlers = [ListMCPServersHandler, GetMCPServerHandler];

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    UserModule,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    MCPFacade,
    MCPServerRepository,
    McpOwnershipGuard,
  ],
  controllers: [MCPController],
  exports:     [MCPFacade],
})
export class MCPModule {
}

