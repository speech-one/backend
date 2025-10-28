import { UserEntity, UserEntitySafe } from '@modules/user/domain/entities';
import type { User } from '@speech-one/database';

export class UserMapper {
  static toDomain(user: User): UserEntity {
    return UserEntity.from(user);
  }

  static toDomainSafe(user: Omit<User, 'password'>): UserEntitySafe {
    const userEntity = UserEntity.from({
      ...user,
      password: '',
    });

    return userEntity.toSafeUser();
  }

  static toDomainList(users: User[]): UserEntity[] {
    return users.map(user => this.toDomain(user));
  }
}

