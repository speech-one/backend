import { MCPServerRepository } from '@modules/mcp/infrastructure/persistence';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMcpCommand } from './delete-mcp.command';

@CommandHandler(DeleteMcpCommand)
export class DeleteMcpHandler implements ICommandHandler<DeleteMcpCommand, boolean> {
  constructor(private readonly mcpServerRepository: MCPServerRepository) {
  }

  async execute(command: DeleteMcpCommand): Promise<boolean> {
    await this.mcpServerRepository.delete(command.id);

    return true;
  }
}

