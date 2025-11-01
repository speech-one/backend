import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateMcpCommand,
  CreateMcpResult,
  DeleteMcpCommand,
  UpdateMCPServerCommand,
  UpdateMCPServerResult,
} from '../commands';
import {
  GetMCPServerQuery,
  GetMCPServerResult,
  ListMCPServersQuery,
  ListMCPServersResult,
} from '../queries';

@Injectable()
export class MCPFacade {
  constructor(private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  async list(userId: string): Promise<ListMCPServersResult> {
    const query = ListMCPServersQuery.from({ userId });

    return this.queryBus.execute<ListMCPServersQuery, ListMCPServersResult>(query);
  }

  async get(id: string): Promise<GetMCPServerResult> {
    const query = GetMCPServerQuery.from({ id });

    return this.queryBus.execute<GetMCPServerQuery, GetMCPServerResult>(query);
  }

  async create(userId: string, json: string): Promise<CreateMcpResult> {
    const command = CreateMcpCommand.from({
      userId, json,
    });

    return this.commandBus.execute<CreateMcpCommand, CreateMcpResult>(command);
  }

  async update(id: string, userId: string, json: string): Promise<UpdateMCPServerResult> {
    const command = UpdateMCPServerCommand.from({
      id, userId, json,
    });

    return this.commandBus.execute<UpdateMCPServerCommand, UpdateMCPServerResult>(command);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const command = DeleteMcpCommand.from({
      id, userId,
    });

    return this.commandBus.execute<DeleteMcpCommand, boolean>(command);
  }
}

