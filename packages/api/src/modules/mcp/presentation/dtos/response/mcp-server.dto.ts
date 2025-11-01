import { ApiProperty } from '@nestjs/swagger';
import { DataClass } from 'dataclasses';

export class MCPServerResponseDto extends DataClass {
  @ApiProperty({
    description: 'MCP Server ID',
    example:     'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'MCP Server title',
    example:     'Context7',
  })
  title: string;

  @ApiProperty({
    description: 'MCP Server arguments',
    example:     'test',
  })
  arguments: string;
}

export class MCPServerDetailResponseDto extends DataClass {
  @ApiProperty({
    description: 'MCP Server ID',
    example:     'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'MCP Server title',
    example:     'chrome-devtools',
  })
  title: string;

  @ApiProperty({
    description: 'MCP Server arguments (JSON string)',
    example:     '{"command": "npx", "args": ["chrome-devtools-mcp@latest"]}',
  })
  arguments: string;

  @ApiProperty({
    description: 'MCP Server metadata (full JSON)',
    example:     '{"mcpServers": {"chrome-devtools": {"command": "npx", "args": ["chrome-devtools-mcp@latest"]}}}',
  })
  metadata: string;
}
