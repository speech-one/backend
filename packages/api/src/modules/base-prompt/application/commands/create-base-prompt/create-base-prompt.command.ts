import { DataClass } from 'dataclasses';

export class CreateBasePromptCommand extends DataClass {
  userId: string;
  prompt: string;
}

