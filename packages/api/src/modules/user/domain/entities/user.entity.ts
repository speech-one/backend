import { UserStatus } from '@speech-one/database';
import { DataClass } from 'dataclasses';

export class UserEntitySafe extends DataClass {
  id:             string;
  name:           string;
  email:          string;
  profileImageId: string | null;
  status:         UserStatus;

  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity extends DataClass {
  id:             string;
  name:           string;
  email:          string;
  password:       string;
  profileImageId: string | null;
  status:         UserStatus;

  createdAt: Date;
  updatedAt: Date;

  isActive(): boolean {
    return this.status === 'ACTIVE';
  }

  isInactive(): boolean {
    return this.status === 'INACTIVE';
  }

  toSafeUser(): UserEntitySafe {
    const { password: _password, ...safeUser } = this;

    return UserEntitySafe.from(safeUser);
  }
}

