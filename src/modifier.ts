import { StateData, type CommonData } from './data.js';
import { Modifiers } from './data/modifiers.js';
import { Machine } from './machine.js';
import { Order } from './order.js';
import { Product } from './product.js';
import { Slot } from './slot.js';
import { Warehouse } from './warehouse.js';
import { World } from './world.js';

export type ModifierState = Record<string, unknown>;

export type ModifierData = CommonData & {
  type:
    | 'contract'
    | 'location'
    | 'machine'
    | 'order'
    | 'product'
    | 'slot'
    | 'warehouse'
    | 'world';
  effect: () => unknown;
  defaultState: ModifierState;
};

export class Modifier extends StateData {
  state = {};

  constructor(dataId: string, state?: ModifierState) {
    super(dataId, Modifiers);
    this.state = state;
  }

  tick(
    world: World,
    subject: Location | Machine | Order | Product | Slot | Warehouse | World
  ) {}
}
