import { CommonData, StateData } from './data.js';
import { Machine } from './machine.js';
import { Modifier } from './modifier.js';
import { Locations } from './data/locations.js';
import type { World } from './world.js';

export type LocationData = CommonData & {
  width: number;
  height: number;
  traffic: number;
  rent: number;
  wealth: number;
  competition: number;
};

export class Location extends StateData {
  machines: Machine[] = [];
  modifiers: Modifier[] = [];

  constructor(dataId: string) {
    super(dataId, Locations);
  }

  tick(world: World) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
    this.machines.forEach((machine) => machine.tick(world, this));
  }

  addMachine(machineId: string) {
    const machine = new Machine(machineId);
    if (machine.data.width < this.data.width) {
      return;
    }
  }
}
