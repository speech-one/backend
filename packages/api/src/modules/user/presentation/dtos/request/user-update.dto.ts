import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user',
    example:     'John Doe',
  })
  name: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @ApiProperty({
    description: 'Profile image file or empty string to remove. Omit to keep existing.',
    example:     '',
    required:    false,
  })
  profileImage?: string | null;
}
