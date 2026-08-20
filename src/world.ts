import { StateData } from './data.js';
import { Location } from './location.js';
import { Modifier } from './modifier.js';
import { Warehouse } from './warehouse.js';

export class World extends StateData {
  locations: Location[] = [];
  warehouses: Warehouse[] = [];
  modifiers: Modifier[] = [];

  money = 0;
  tickRate = 1;

  currentTime: number;
  lastTick: number;
  deltaTick: number;

  update() {
    this.currentTime = performance.now() / 1000;
    this.deltaTick = this.currentTime - (this.lastTick ?? this.tickRate);
    if (this.deltaTick >= this.tickRate) {
      this.lastTick = this.currentTime;
      this.tick();
    }
    setTimeout(() => this.update(), 1000 / 60);
  }

  tick(): void {
    this.modifiers.forEach((modifier) => modifier.tick(this, this));
    this.locations.forEach((location) => location.tick(this));
    this.warehouses.forEach((warehouse) => warehouse.tick(this));
  }

  addLocation(locationId: string) {
    if (this.locations.some((location) => location.dataId === locationId)) {
      console.warn('Location already added', locationId);
      return;
    }
    const location = new Location(locationId);
    this.locations.push(location);
  }

  addWarehouse(warehouseId: string) {
    if (this.warehouses.some((warehouse) => warehouse.dataId === warehouseId)) {
      console.warn('Warehouse already added', warehouseId);
      return;
    }
    const warehouse = new Warehouse(warehouseId);
    this.warehouses.push(warehouse);
  }
}
