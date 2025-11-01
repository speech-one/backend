import { ApiProperty } from '@nestjs/swagger';
import { DataClass } from 'dataclasses';

export class BasePromptResponseDto extends DataClass {
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
}
