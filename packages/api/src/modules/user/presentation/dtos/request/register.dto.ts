import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user',
    example:     'John Doe',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user',
    example:     'test@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'The password of the user',
    example:     'password123',
  })
  password: string;

  @ApiProperty({
    type:        'string',
    format:      'binary',
    description: 'The profile image file (optional)',
    required:    false,
  })
  profileImage?: Express.Multer.File;
}

