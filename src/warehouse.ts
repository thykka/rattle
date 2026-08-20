import { StateData, type CommonData } from './data.js';
import { Machine } from './machine.js';
import { Modifier } from './modifier.js';
import { Order } from './order.js';
import { Product } from './product.js';
import { Warehouses } from './data/warehouses.js';
import type { World } from './world.js';

export type WarehouseData = CommonData & {
  width: number;
  height: number;
  stackLimit: number;
};

export class Warehouse extends StateData {
  machines: Machine[] = [];
  modifiers: Modifier[] = [];
  orders: Order[] = [];
  products: Product[] = [];

  constructor(dataId: string) {
    super(dataId, Warehouses);
  }

  tick(world: World) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
    this.orders.forEach((order) => order.tick(world, this));
  }
}
