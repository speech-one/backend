import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserUpdateCommand } from '../commands';
import { UserDetailQuery, UserDetailResult } from '../queries';

@Injectable()
export class UserFacade {
  constructor(private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  async getDetail(id: string): Promise<UserDetailResult> {
    const query = UserDetailQuery.from({ id });

    return this.queryBus.execute<UserDetailQuery, UserDetailResult>(query);
  }

  async update(id: string, name: string, profileImage?: Express.Multer.File): Promise<boolean> {
    const command = UserUpdateCommand.from({
      id, name, profileImage,
    });

    return this.commandBus.execute<UserUpdateCommand, boolean>(command);
  }
}

