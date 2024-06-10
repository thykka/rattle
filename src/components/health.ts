import { Stat } from './stat.js';

export class Health extends Stat {
  constructor(
    public value: number = 1,
    public valueMax: number = 1
  ) {
    super(value);
  }
}
