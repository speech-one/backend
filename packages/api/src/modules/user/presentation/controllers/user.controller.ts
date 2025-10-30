import { ApiResponseType } from '@common/lib/swagger/decorators';
import { UserUpdateCommand } from '@modules/user/application/commands';
import { UserDetailQuery, UserDetailResult } from '@modules/user/application/queries';
import { UserEntity } from '@modules/user/domain/entities';
import { CurrentUser } from '@modules/user/presentation/decorators';
import {
  Body,
  Controller,
  Get,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserUpdateRequestDto } from '../dtos/request/user-update.dto';
import { UserDetailResponseDto } from '../dtos/response/user-detail.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {
  }

  @Get('me')
  @ApiResponseType({
    type:        UserDetailResponseDto,
    description: 'User detail successful',
    errors:      [
      400,
      401,
      500,
    ],
  })
  async detail(@CurrentUser() user: UserEntity): Promise<UserDetailResponseDto> {
    const query = UserDetailQuery.from({ id: user.id });
    const result = await this.queryBus.execute<UserDetailQuery, UserDetailResult>(query);

    return UserDetailResponseDto.from(result);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiConsumes('multipart/form-data')
  @ApiResponseType({
    type:        'boolean',
    description: 'User update successful',
    errors:      [
      400,
      401,
      500,
    ],
  })
  async update(@CurrentUser() user: UserEntity,
    @Body() body: UserUpdateRequestDto,
    @UploadedFile() profileImage?: Express.Multer.File): Promise<boolean> {
    const profileImageToUse = body.profileImage === null ? null : profileImage;

    const command = UserUpdateCommand.from({
      userId:       user.id,
      name:         body.name,
      profileImage: profileImageToUse,
    });

    return await this.commandBus.execute<UserUpdateCommand, boolean>(command);
  }
}
