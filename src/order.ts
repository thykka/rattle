import { type CommonData, StateData } from './data.js';
import type { MachineOrder } from './machine.js';
import type { Modifier } from './modifier.js';
import type { ProductOrder } from './product.js';
import type { Warehouse } from './warehouse.js';
import type { World } from './world.js';

export type OrderData = CommonData & {
  modifierIds?: string[];
  price: number;
  duration: number;
};

export class Order<D extends OrderData = OrderData> extends StateData<D> {
  orderedAt: number;
  delivered: boolean = false;
  modifiers: Modifier[] = [];

  constructor(orderId: string, data: D[]) {
    super(orderId, data);
  }

  tick(world: World, warehouse: Warehouse) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
    if (typeof this.orderedAt !== 'number') this.orderedAt = world.currentTime;
    const elapsed = world.currentTime - this.orderedAt;
    if (elapsed >= this.data.duration) {
      this.deliver(warehouse);
      this.delivered = true;
    }
  }

  deliver(warehouse: Warehouse): void {}

  static isProductOrder(order): order is ProductOrder {
    return Boolean(order?.product);
  }

  static isMachineOrder(order): order is MachineOrder {
    return Boolean(order?.machine);
  }
}
