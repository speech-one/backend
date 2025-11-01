import { MCPServerRepository } from '@modules/mcp/infrastructure/persistence';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetMCPServerQuery } from './get-mcp-server.query';
import { GetMCPServerResult } from './get-mcp-server.result';

@QueryHandler(GetMCPServerQuery)
export class GetMCPServerHandler implements IQueryHandler<GetMCPServerQuery, GetMCPServerResult> {
  constructor(private readonly mcpServerRepository: MCPServerRepository) {
  }

  async execute(query: GetMCPServerQuery): Promise<GetMCPServerResult> {
    const server = await this.mcpServerRepository.findById(query.id);

    if (!server) {
      throw new NotFoundException('MCP Server를 찾을 수 없습니다.');
    }

    return GetMCPServerResult.from({
      id:        server.id,
      title:     server.title,
      arguments: server.arguments,
      metadata:  server.metadata,
    });
  }
}

