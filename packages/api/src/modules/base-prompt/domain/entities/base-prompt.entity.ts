import { DataClass } from 'dataclasses';

export class BasePromptEntity extends DataClass {
  id:     string;
  userId: string;
  prompt: string;
}

