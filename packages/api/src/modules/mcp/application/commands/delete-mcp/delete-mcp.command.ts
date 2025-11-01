import { DataClass } from 'dataclasses';

export class DeleteMcpCommand extends DataClass {
  id:     string;
  userId: string;
}

