import { MCPServerRepository } from '@modules/mcp/infrastructure/persistence';
import { UserEntity } from '@modules/user/domain/entities';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class McpOwnershipGuard implements CanActivate {
  constructor(private readonly mcpServerRepository: MCPServerRepository) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    const mcpServerId = request.params.id;

    if (!user) {
      throw new ForbiddenException('인증이 필요합니다.');
    }

    const server = await this.mcpServerRepository.findById(mcpServerId);

    if (!server) {
      throw new NotFoundException('MCP Server를 찾을 수 없습니다.');
    }

    if (server.userId !== user.id) {
      throw new ForbiddenException('자신의 MCP Server만 삭제할 수 있습니다.');
    }

    return true;
  }
}

