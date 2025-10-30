import { ApiProperty } from '@nestjs/swagger';
import { ListBasePromptsResult } from '@modules/base-prompt/application/queries';

export class BasePromptResponseDto {
  @ApiProperty({
    description: 'Base prompt ID',
    example:     'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Base prompt text',
    example:     'You are a helpful assistant.',
  })
  prompt: string;

  static from(result: ListBasePromptsResult['basePrompts'][0]): BasePromptResponseDto {
    const dto = new BasePromptResponseDto();
    dto.id = result.id;
    dto.prompt = result.prompt;

    return dto;
  }
}

export class ListBasePromptsResponseDto {
  @ApiProperty({
    description: 'List of base prompts',
    type:        [BasePromptResponseDto],
  })
  basePrompts: BasePromptResponseDto[];

  static from(result: ListBasePromptsResult): ListBasePromptsResponseDto {
    const dto = new ListBasePromptsResponseDto();
    dto.basePrompts = result.basePrompts.map(bp => BasePromptResponseDto.from(bp));

    return dto;
  }
}

