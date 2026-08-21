import { StateData, type CommonData } from './data.js';
import { Product } from './product.js';
import { Slots } from './data/slots.js';

export type SlotData = CommonData & {
  width: number;
  height: number;
  stackLimit: number;
};

export class Slot extends StateData<SlotData> {
  product?: Product = null;

  constructor(dataId: string) {
    super(dataId, Slots);
  }

  clearProduct() {
    this.product = null;
  }

  addProduct(productId: string, amount?: number): number | void {
    const product = new Product(productId, amount);
    if (
      this.data.height !== product.data.slotHeight ||
      this.data.width !== product.data.slotWidth
    ) {
      console.warn('Product size mismatch');
      return;
    }
    if (!amount) product.stackAmount = product.data.stackSize;
    const overflow = product.stackAmount - this.data.stackLimit;
    if (overflow > 0) product.stackAmount -= overflow;
    this.product = product;
    return overflow;
  }
}
