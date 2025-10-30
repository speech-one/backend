import { DataClass } from 'dataclasses';

export class UserUpdateCommand extends DataClass {
  userId: string;

  name?:         string;
  profileImage?: Express.Multer.File | null;
}
