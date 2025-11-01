import { DataClass } from 'dataclasses';

export class UpdateMCPServerCommand extends DataClass {
  id:     string;
  userId: string;
  json:   string;
}

