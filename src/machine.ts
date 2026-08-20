import { StateData, type CommonData } from './data.js';
import { Modifier } from './modifier.js';
import { Slot } from './slot.js';
import { Machines } from './data/machines.js';
import type { Location } from './location.js';
import type { World } from './world.js';

export type MachineData = CommonData & {
  // image: unknown;
  locationWidth: number;
  locationHeight: number;
  slotsWidth: number;
  slotsHeight: number;
  slots: {
    dataId: string;
    top: number;
    left: number;
  }[];
};

export class Machine extends StateData {
  slots: Slot[];
  modifiers: Modifier[];
  money: number;

  constructor(dataId: string) {
    super(dataId, Machines);
  }

  tick(world: World, location: Location) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
  }
}
