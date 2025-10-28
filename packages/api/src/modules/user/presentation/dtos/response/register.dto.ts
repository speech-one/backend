import { ApiProperty } from '@nestjs/swagger';
import { DataClass } from 'dataclasses';

export class RegisterResponseDto extends DataClass {
  @ApiProperty({
    description: 'Registration success status',
    example:     true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Registration message',
    example:     'User registered successfully',
  })
  message: string;
}

