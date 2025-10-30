import { DataClass } from 'dataclasses';

export class ListBasePromptsResult extends DataClass {
  basePrompts: Array<{
    id:     string;
    prompt: string;
  }>;
}

