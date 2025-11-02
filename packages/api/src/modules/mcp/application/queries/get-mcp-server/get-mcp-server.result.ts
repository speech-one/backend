import { DataClass } from 'dataclasses';

export class GetMCPServerResult extends DataClass {
  id:       string;
  title:    string;
  args:     string;
  metadata: string;
}

