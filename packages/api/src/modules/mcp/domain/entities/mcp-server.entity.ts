import { DataClass } from 'dataclasses';

export class McpServerEntity extends DataClass {
  id:        string;
  userId:    string;
  title:     string;
  arguments: string;
  metadata:  string;
}

