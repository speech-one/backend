import { DataClass } from 'dataclasses';

export class RegisterResult extends DataClass {
  success: boolean;
  message: string;
}

