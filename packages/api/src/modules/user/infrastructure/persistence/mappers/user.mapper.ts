import { UserEntity, UserEntitySafe } from '@modules/user/domain/entities';
import type { Prisma, User } from '@speech-one/database';

export class UserMapper {
  static toDomain(user: User): UserEntity {
    return UserEntity.from(user);
  }

  static toDomainSafe(user: Omit<User, 'password'>): UserEntitySafe {
    return UserEntitySafe.from(user);
  }

  static toDomainList(users: User[]): UserEntity[] {
    return users.map(user => this.toDomain(user));
  }

  static toCreateInput(user: UserEntity): Prisma.UserCreateInput {
    return user.omit([
      'id', 'createdAt', 'updatedAt',
    ]);
  }

  static toUpdateInputWithRelations(user: UserEntitySafe): Prisma.UserUpdateInput {
    return {
      name:         user.name,
      profileImage: user.profileImageId ? { connect: { id: user.profileImageId } } : undefined,
    };
  }

  static toUpdateInputWithPasswordAndRelations(user: UserEntity): Prisma.UserUpdateInput {
    return {
      name:         user.name,
      password:     user.password,
      profileImage: user.profileImageId ? { connect: { id: user.profileImageId } } : undefined,
    };
  }
}

