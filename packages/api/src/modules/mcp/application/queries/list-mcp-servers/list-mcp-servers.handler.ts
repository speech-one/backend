import { MCPServerRepository } from '@modules/mcp/infrastructure/persistence';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListMCPServersQuery } from './list-mcp-servers.query';
import { ListMCPServersResult } from './list-mcp-servers.result';

@QueryHandler(ListMCPServersQuery)
export class ListMCPServersHandler implements IQueryHandler<ListMCPServersQuery, ListMCPServersResult> {
  constructor(private readonly mcpServerRepository: MCPServerRepository) {
  }

  async execute(query: ListMCPServersQuery): Promise<ListMCPServersResult> {
    const { userId } = query;
    const servers = await this.mcpServerRepository.findByUserId(userId);

    return ListMCPServersResult.from({ servers: servers.map(s => ({
      id:    s.id,
      title: s.title,
      args:  s.args,
    })) });
  }
}

