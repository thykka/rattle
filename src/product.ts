import { type CommonData, StateData } from './data.js';
import { ProductOrders, Products } from './data/products.js';
import { Order, OrderData } from './order.js';
import type { Warehouse } from './warehouse.js';

export interface ProductData extends CommonData {
  slotWidth: number;
  slotHeight: number;
  // image: unknown;
  stackSize: number;
  retailPrice: number;
}

export class Product extends StateData<ProductData> {
  stackAmount = 1;

  constructor(dataId: string, stackAmount?: number) {
    super(dataId, Products);
    if (!this.data) console.warn('No data for product', dataId);
    if (typeof stackAmount === 'number' && stackAmount >= 0) {
      this.stackAmount = stackAmount;
    }
  }
}

export type ProductOrderData = OrderData & {
  productId: string;
  productStacks: number;
};

export class ProductOrder extends Order<ProductOrderData> {
  product: Product;

  constructor(orderId: string) {
    super(orderId, ProductOrders);
    this.product = new Product(this.data.productId);
    this.product.stackAmount =
      this.product.data.stackSize * this.data.productStacks;
  }

  deliver(warehouse: Warehouse) {
    warehouse.addProduct(this.data.productId, this.product.stackAmount);
  }
}
