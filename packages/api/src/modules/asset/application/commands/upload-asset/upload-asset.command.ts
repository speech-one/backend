import { DataClass } from 'dataclasses';

export class UploadAssetCommand extends DataClass {
  file:       Express.Multer.File;
  directory?: string;
  acl?:       'private' | 'public-read' | 'public-read-write' | 'authenticated-read';
}

