import { Action } from './Action.js';

export type ButtonActionData = {
  target: number;
  source?: number;
};

export class ButtonAction extends Action<ButtonActionData> {}
