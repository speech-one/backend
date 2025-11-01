import { ApiResponseType } from '@common/lib/swagger/decorators';
import { CreateMcpCommand, CreateMcpResult, DeleteMcpCommand, UpdateMCPServerCommand, UpdateMCPServerResult } from '@modules/mcp/application/commands';
import { GetMCPServerQuery, GetMCPServerResult, ListMCPServersQuery, ListMCPServersResult } from '@modules/mcp/application/queries';
import { McpOwnershipGuard } from '@modules/mcp/infrastructure/guards';
import { UserEntity } from '@modules/user/domain/entities';
import { JwtAuthGuard } from '@modules/user/infrastructure/guards';
import { CurrentUser } from '@modules/user/presentation/decorators';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateMCPRequestDto, UpdateMCPServerRequestDto } from '../dtos/request';
import { MCPServerDetailResponseDto, MCPServerResponseDto } from '../dtos/response';

@ApiTags('MCP')
@Controller('mcp')
@UseGuards(JwtAuthGuard)
export class MCPController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {
  }

  @Post()
  @ApiResponseType({
    type:        'string',
    description: 'MCP created successfully',
    errors:      [
      400,
      401,
      500,
    ],
  })
  async create(
    @CurrentUser() user: UserEntity,
    @Body() body: CreateMCPRequestDto,
  ): Promise<{ id: string }> {
    const command = CreateMcpCommand.from({
      userId: user.id,
      json:   body.json,
    });

    const result = await this.commandBus.execute<CreateMcpCommand, CreateMcpResult>(command);

    return {
      id: result.id,
    };
  }

  @Get()
  @ApiResponseType({
    type:        MCPServerResponseDto,
    isArray:     true,
    description: 'List of MCP servers',
    errors:      [
      401,
      500,
    ],
  })
  async list(@CurrentUser() user: UserEntity): Promise<MCPServerResponseDto[]> {
    const query = ListMCPServersQuery.from({ userId: user.id });
    const result = await this.queryBus.execute<ListMCPServersQuery, ListMCPServersResult>(query);

    return result.servers.map(server => MCPServerResponseDto.from(server));
  }

  @Get(':id')
  @UseGuards(McpOwnershipGuard)
  @ApiResponseType({
    type:        MCPServerDetailResponseDto,
    description: 'MCP Server details',
    errors:      [
      401,
      403,
      404,
      500,
    ],
  })
  async get(@Param('id') id: string): Promise<MCPServerDetailResponseDto> {
    const query = GetMCPServerQuery.from({ id });
    const result = await this.queryBus.execute<GetMCPServerQuery, GetMCPServerResult>(query);

    return MCPServerDetailResponseDto.from(result);
  }

  @Patch(':id')
  @UseGuards(McpOwnershipGuard)
  @ApiResponseType({
    type:        'object',
    description: 'MCP Server updated successfully',
    errors:      [
      400,
      401,
      403,
      404,
      500,
    ],
  })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() body: UpdateMCPServerRequestDto,
  ): Promise<{ id: string }> {
    const command = UpdateMCPServerCommand.from({
      id,
      userId: user.id,
      json:   body.json,
    });

    const result = await this.commandBus.execute<UpdateMCPServerCommand, UpdateMCPServerResult>(command);

    return { id: result.id };
  }

  @Delete(':id')
  @UseGuards(McpOwnershipGuard)
  @ApiResponseType({
    type:        'boolean',
    description: 'MCP deleted successfully',
    errors:      [
      401,
      403,
      404,
      500,
    ],
  })
  async delete(@Param('id') id: string, @CurrentUser() user: UserEntity): Promise<boolean> {
    const command = DeleteMcpCommand.from({
      id,
      userId: user.id,
    });

    return await this.commandBus.execute<DeleteMcpCommand, boolean>(command);
  }
}

