import { type CommonData, StateData } from './data.js';
import { Products } from './data/products.js';

export interface ProductData extends CommonData {
  slotWidth: number;
  slotHeight: number;
  // image: unknown;
  stackSize: number;
  orderPrice: number;
  orderDuration: number; // ticks
  retailPrice: number;
}

export class Product extends StateData {
  stackAmount = 0;

  constructor(dataId: string, stackAmount?: number) {
    super(dataId, Products);
    if (typeof stackAmount === 'number' && stackAmount >= 0) {
      this.stackAmount = stackAmount;
    }
    console.log(this);
  }
}
