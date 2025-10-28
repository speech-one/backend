import { UserStatus } from '@speech-one/database';
import { DataClass } from 'dataclasses';

export class UserDetailResult extends DataClass {
  id:              string;
  name:            string;
  email:           string;
  profileImageUrl: string | null;
  status:          UserStatus;

  createdAt: Date;
  updatedAt: Date;
}
