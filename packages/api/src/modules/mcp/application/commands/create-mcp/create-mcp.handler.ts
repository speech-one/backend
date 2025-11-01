import { McpServerEntity } from '@modules/mcp/domain/entities';
import { MCPServerRepository } from '@modules/mcp/infrastructure/persistence';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMcpCommand } from './create-mcp.command';
import { CreateMcpResult } from './create-mcp.result';

interface McpServerData {
  title:     string;
  arguments: string;
}

@CommandHandler(CreateMcpCommand)
export class CreateMcpHandler implements ICommandHandler<CreateMcpCommand, CreateMcpResult> {
  constructor(private readonly mcpServerRepository: MCPServerRepository) {
  }

  async execute(command: CreateMcpCommand): Promise<CreateMcpResult> {
    let parsedJson: Record<string, unknown>;

    try {
      parsedJson = JSON.parse(command.json);
    } catch {
      throw new BadRequestException('유효하지 않은 JSON 형식입니다.');
    }

    const mcpServers = parsedJson.mcpServers as Record<string, unknown> | undefined;

    if (!mcpServers || typeof mcpServers !== 'object' || Array.isArray(mcpServers)) {
      throw new BadRequestException('mcpServers는 객체 형태여야 합니다.');
    }

    const servers: McpServerData[] = Object.entries(mcpServers).map(([title, config]) => ({
      title,
      arguments: JSON.stringify(config),
    }));

    if (servers.length === 0) {
      throw new BadRequestException('MCP 서버가 없습니다.');
    }

    // 사용자의 모든 기존 서버 가져오기
    const existingServers = await this.mcpServerRepository.findByUserId(command.userId);
    const incomingTitles = new Set(servers.map(s => s.title));

    // 기존에 있던건데 새로 들어온 값에 없다면 삭제
    for (const existingServer of existingServers) {
      if (!incomingTitles.has(existingServer.title)) {
        await this.mcpServerRepository.delete(existingServer.id);
      }
    }

    // 새로 생긴거라면 추가, 이미 있던건데 그대로 들어오면 Update
    for (const server of servers) {
      if (!server.title) {
        continue;
      }

      const existingServer = await this.mcpServerRepository.findByUserIdAndTitle(command.userId,
        server.title);

      if (existingServer) {
        // Update
        await this.mcpServerRepository.update(existingServer.id, {
          arguments: server.arguments,
          metadata:  command.json,
        });
      } else {
        // Create
        const newServer = McpServerEntity.from({
          id:        '',
          userId:    command.userId,
          title:     server.title,
          arguments: server.arguments,
          metadata:  command.json,
        });

        await this.mcpServerRepository.create(newServer);
      }
    }

    // 첫 번째 서버의 ID를 반환 (기존 로직 유지)
    const firstServer = await this.mcpServerRepository.findByUserIdAndTitle(command.userId,
      servers[0].title);

    return CreateMcpResult.from({ id: firstServer!.id });
  }
}

