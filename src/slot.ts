import { StateData, type CommonData } from './data.js';
import type { Product } from './product.js';
import { Slots } from './data/slots.js';

export type SlotData = CommonData & {
  width: number;
  height: number;
  stackLimit: number;
};

export class Slot extends StateData {
  product?: Product = null;

  constructor(dataId: string) {
    super(dataId, Slots);
  }
}
