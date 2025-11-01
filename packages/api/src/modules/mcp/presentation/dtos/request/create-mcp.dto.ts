import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMCPRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'MCP JSON configuration',
    example:     '{"mcpServers": [{"title": "Context7", "arguments": "test"}]}',
  })
  json: string;
}

