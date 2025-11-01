import { DataClass } from 'dataclasses';

export class CreateMcpCommand extends DataClass {
  userId: string;
  json:   string;
}

