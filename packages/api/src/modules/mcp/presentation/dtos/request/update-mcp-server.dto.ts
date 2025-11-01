import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMCPServerRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'MCP JSON configuration (mcpServers must have exactly one server)',
    example:     '{"mcpServers": {"chrome-devtools": {"command": "npx", "args": ["chrome-devtools-mcp@latest"]}}}',
  })
  json: string;
}

