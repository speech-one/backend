import { DataClass } from 'dataclasses';

export class ListMCPServersResult extends DataClass {
  servers: Array<{
    id:    string;
    title: string;
    args:  string;
  }>;
}

