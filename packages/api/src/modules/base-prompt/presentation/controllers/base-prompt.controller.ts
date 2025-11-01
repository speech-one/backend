import { ApiResponseType } from '@common/lib/swagger/decorators';
import { CreateBasePromptCommand, CreateBasePromptResult, DeleteBasePromptCommand } from '@modules/base-prompt/application/commands';
import { ListBasePromptsQuery, ListBasePromptsResult } from '@modules/base-prompt/application/queries';
import { BasePromptOwnershipGuard } from '@modules/base-prompt/infrastructure/guards';
import { UserEntity } from '@modules/user/domain/entities';
import { JwtAuthGuard } from '@modules/user/infrastructure/guards';
import { CurrentUser } from '@modules/user/presentation/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateBasePromptRequestDto } from '../dtos/request/create-base-prompt.dto';
import { BasePromptResponseDto } from '../dtos/response';

@ApiTags('Base Prompt')
@Controller('base-prompt')
@UseGuards(JwtAuthGuard)
export class BasePromptController {
  constructor(private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @Post()
  @ApiResponseType({
    type:        BasePromptResponseDto,
    description: 'Base prompt created successfully',
    errors:      [
      400,
      401,
      500,
    ],
  })
  async create(@CurrentUser() user: UserEntity,
    @Body() body: CreateBasePromptRequestDto): Promise<BasePromptResponseDto> {
    const command = CreateBasePromptCommand.from({
      userId: user.id,
      prompt: body.prompt,
    });

    const result = await this.commandBus.execute<CreateBasePromptCommand, CreateBasePromptResult>(command);

    return BasePromptResponseDto.from({
      id:     result.id,
      prompt: result.prompt,
    });
  }

  @Get()
  @ApiResponseType({
    type:        BasePromptResponseDto,
    isArray:     true,
    description: 'List of base prompts',
    errors:      [
      401,
      500,
    ],
  })
  async list(@CurrentUser() user: UserEntity): Promise<BasePromptResponseDto[]> {
    const query = ListBasePromptsQuery.from({ userId: user.id });
    const result = await this.queryBus.execute<ListBasePromptsQuery, ListBasePromptsResult>(query);

    return result.basePrompts.map(bp => BasePromptResponseDto.from(bp));
  }

  @Delete(':id')
  @UseGuards(BasePromptOwnershipGuard)
  @ApiResponseType({
    type:        'boolean',
    description: 'Base prompt deleted successfully',
    errors:      [
      401,
      403,
      404,
      500,
    ],
  })
  async delete(@Param('id') id: string, @CurrentUser() user: UserEntity): Promise<boolean> {
    const command = DeleteBasePromptCommand.from({
      id,
      userId: user.id,
    });

    return await this.commandBus.execute<DeleteBasePromptCommand, boolean>(command);
  }
}

