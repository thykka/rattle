import { StateData } from './data.js';
import { Modifier } from './modifier.js';
import type { Warehouse } from './warehouse.js';
import type { World } from './world.js';

export class Order extends StateData {
  productId?: string;
  machineId?: string;
  warehouseId?: string;
  locationId?: string;
  orderedAt: number;
  delivered: boolean = false;
  modifiers: Modifier[] = [];

  tick(world: World, warehouse: Warehouse) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
  }
}
