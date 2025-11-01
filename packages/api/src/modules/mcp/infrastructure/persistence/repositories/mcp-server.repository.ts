import { McpServerEntity } from '@modules/mcp/domain/entities';
import { MCPServerRepositoryPort } from '@modules/mcp/domain/repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma';
import { MCPServerMapper } from '../mappers';

@Injectable()
export class MCPServerRepository implements MCPServerRepositoryPort {
  constructor(private readonly prisma: PrismaService) {
  }

  async findByUserId(userId: string): Promise<McpServerEntity[]> {
    const servers = await this.prisma.mcpServer.findMany({
      where:   { userId },
      orderBy: { createdAt: 'asc' },
    });

    return MCPServerMapper.toDomainList(servers);
  }

  async findById(id: string): Promise<McpServerEntity | null> {
    const server = await this.prisma.mcpServer.findUnique({ where: { id } });

    if (!server) {
      return null;
    }

    return MCPServerMapper.toDomain(server);
  }

  async findByUserIdAndTitle(userId: string, title: string): Promise<McpServerEntity | null> {
    const server = await this.prisma.mcpServer.findUnique({ where: { userId_title: {
      userId, title,
    } } });

    if (!server) {
      return null;
    }

    return MCPServerMapper.toDomain(server);
  }

  async create(server: McpServerEntity): Promise<McpServerEntity> {
    const data = MCPServerMapper.toCreateInput(server);
    const row = await this.prisma.mcpServer.create({ data });

    return MCPServerMapper.toDomain(row);
  }

  async update(id: string, server: Partial<McpServerEntity>): Promise<McpServerEntity> {
    const data = MCPServerMapper.toUpdateInput(server);

    const row = await this.prisma.mcpServer.update({
      where: { id },
      data,
    });

    return MCPServerMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mcpServer.delete({ where: { id } });
  }
}
