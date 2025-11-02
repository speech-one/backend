import { McpServerEntity } from '@modules/mcp/domain/entities';
import type { McpServer, Prisma } from '@speech-one/database';

export class MCPServerMapper {
  static toDomain(server: McpServer): McpServerEntity {
    return McpServerEntity.from({
      id:       server.id,
      userId:   server.userId,
      title:    server.title,
      args:     server.args,
      metadata: server.metadata,
    });
  }

  static toDomainList(servers: McpServer[]): McpServerEntity[] {
    return servers.map(server => this.toDomain(server));
  }

  static toCreateInput(server: McpServerEntity): Prisma.McpServerCreateInput {
    return {
      user:     { connect: { id: server.userId } },
      title:    server.title,
      args:     server.args,
      metadata: server.metadata,
    };
  }

  static toUpdateInput(server: Partial<McpServerEntity>): Prisma.McpServerUpdateInput {
    return {
      title:    server.title,
      args:     server.args,
      metadata: server.metadata,
    };
  }
}

