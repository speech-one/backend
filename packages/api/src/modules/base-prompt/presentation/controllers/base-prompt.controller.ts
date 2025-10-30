import { ApiResponseType } from '@common/lib/swagger/decorators';
import { DeleteBasePromptCommand } from '@modules/base-prompt/application/commands';
import { ListBasePromptsQuery, ListBasePromptsResult } from '@modules/base-prompt/application/queries';
import { OwnershipGuard } from '@modules/base-prompt/infrastructure/guards';
import { UserEntity } from '@modules/user/domain/entities';
import { JwtAuthGuard } from '@modules/user/infrastructure/guards';
import { CurrentUser } from '@modules/user/presentation/decorators';
import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ListBasePromptsResponseDto } from '../dtos/response/base-prompt.dto';

@ApiTags('Base Prompt')
@Controller('base-prompt')
@UseGuards(JwtAuthGuard)
export class BasePromptController {
  constructor(private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @Get()
  @ApiResponseType({
    type:        ListBasePromptsResponseDto,
    description: 'List of base prompts',
    errors:      [
      401,
      500,
    ],
  })
  async list(@CurrentUser() user: UserEntity): Promise<ListBasePromptsResponseDto> {
    const query = ListBasePromptsQuery.from({ userId: user.id });
    const result = await this.queryBus.execute<ListBasePromptsQuery, ListBasePromptsResult>(query);

    return ListBasePromptsResponseDto.from(result);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
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

