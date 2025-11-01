import { ApiProperty } from '@nestjs/swagger';

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

  static from(result: {
    id:     string;
    prompt: string;
  }): BasePromptResponseDto {
    const dto = new BasePromptResponseDto;

    dto.id = result.id;

    dto.prompt = result.prompt;

    return dto;
  }
}
