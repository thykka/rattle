import { type CommonData, StateData } from './data.js';
import type { Modifier } from './modifier.js';
import type { World } from './world.js';
import { Machine } from './machine.js';
import { Locations } from './data/locations.js';

export type LocationData = CommonData & {
  width: number;
  height: number;
  traffic: number;
  rent: number;
  wealth: number;
  competition: number;
};

export class Location extends StateData<LocationData> {
  machines: Machine[] = [];
  modifiers: Modifier[] = [];

  constructor(dataId: string) {
    super(dataId, Locations);
  }

  tick(world: World) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
    if (!this.payRent(world)) {
      console.warn('Cannot pay rent', this.data.title);
      return;
    }
    this.machines.forEach((machine) => machine.tick(world, this));
  }

  addMachine(machineId: string) {
    const machine = new Machine(machineId);
    if (machine.data.locationWidth > this.data.width) {
      console.warn(
        'Machine too wide for location',
        this.data.width,
        machine.data.locationWidth
      );
      return;
    }
    this.machines.push(machine);
  }

  payRent(world: World): boolean | void {
    if (this.data.rent > 0 && world.money - this.data.rent < 0) return false;
    world.money -= this.data.rent;
    return true;
  }
}
