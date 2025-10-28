import { DataClass } from 'dataclasses';

export class RegisterCommand extends DataClass {
  name:          string;
  email:         string;
  password:      string;
  profileImage?: Express.Multer.File;
}

