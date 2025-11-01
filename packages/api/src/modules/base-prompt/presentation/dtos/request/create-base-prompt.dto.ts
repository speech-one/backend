import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBasePromptRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The prompt text',
    example:     'You are a helpful assistant.',
  })
  prompt: string;
}

