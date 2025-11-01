import { McpServerEntity } from '../entities';

export interface MCPServerRepositoryPort {
  findByUserId(userId: string): Promise<McpServerEntity[]>;

  findById(id: string): Promise<McpServerEntity | null>;

  findByUserIdAndTitle(userId: string, title: string): Promise<McpServerEntity | null>;

  create(server: McpServerEntity): Promise<McpServerEntity>;

  update(id: string, server: Partial<McpServerEntity>): Promise<McpServerEntity>;

  delete(id: string): Promise<void>;
}

