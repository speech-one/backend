import { MCPServerRepository } from '@modules/mcp/infrastructure/persistence';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMCPServerCommand } from './update-mcp-server.command';
import { UpdateMCPServerResult } from './update-mcp-server.result';

@CommandHandler(UpdateMCPServerCommand)
export class UpdateMCPServerHandler implements ICommandHandler<UpdateMCPServerCommand, UpdateMCPServerResult> {
  constructor(private readonly mcpServerRepository: MCPServerRepository) {
  }

  async execute(command: UpdateMCPServerCommand): Promise<UpdateMCPServerResult> {
    const server = await this.mcpServerRepository.findById(command.id);

    if (!server) {
      throw new NotFoundException('MCP Server를 찾을 수 없습니다.');
    }

    if (server.userId !== command.userId) {
      throw new NotFoundException('MCP Server를 찾을 수 없습니다.');
    }

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

    const serverKeys = Object.keys(mcpServers);

    if (serverKeys.length !== 1) {
      throw new BadRequestException('mcpServers에는 하나의 서버만 있어야 합니다.');
    }

    const [title, config] = Object.entries(mcpServers)[0];
    const serverMetadata = JSON.stringify({ mcpServers: { [title]: config } });

    await this.mcpServerRepository.update(command.id, {
      title:    title,
      args:     JSON.stringify(config),
      metadata: serverMetadata,
    });

    return UpdateMCPServerResult.from({ id: command.id });
  }
}

