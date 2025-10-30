import { DataClass } from 'dataclasses';

export class DeleteBasePromptCommand extends DataClass {
  id:     string;
  userId: string;
}

