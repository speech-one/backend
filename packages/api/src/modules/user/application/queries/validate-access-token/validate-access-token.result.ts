import { DataClass } from 'dataclasses';
import { UserEntitySafe } from '@/modules/user/domain';

export class ValidateAccessTokenResult extends DataClass {
  user: UserEntitySafe;
}

