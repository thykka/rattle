import { StateData, type CommonData } from './data.js';
import type { Location } from './location.js';
import type { Modifier } from './modifier.js';
import type { Warehouse } from './warehouse.js';
import type { World } from './world.js';
import { Slot } from './slot.js';
import { MachineOrders, Machines } from './data/machines.js';
import { Order, type OrderData } from './order.js';

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

export type MachineOrderData = OrderData & {
  machineId: string;
};

export class Machine extends StateData<MachineData> {
  slots: Slot[] = [];
  modifiers: Modifier[] = [];
  money: number = 0;

  constructor(dataId: string) {
    super(dataId, Machines);
    this.slots = this.data.slots.map((slot) => {
      return new Slot(slot.dataId);
    });
  }

  tick(world: World, location: Location) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
    const sellChance =
      location.data.traffic *
      location.data.wealth *
      (1 - location.data.competition);
    if (Math.random() < sellChance) {
      this.sellProduct();
    }
  }

  sellProduct() {
    const stockedSlots = this.slots.filter(
      (s) => s.product && s.product.stackAmount > 0
    );
    if (stockedSlots.length === 0) return;
    const chosenSlot =
      stockedSlots[Math.floor(Math.random() * stockedSlots.length)];
    chosenSlot.product.stackAmount -= 1;
    this.money += chosenSlot.product.data.retailPrice;
    if (chosenSlot.product.stackAmount === 0) {
      chosenSlot.product = null;
    }
  }

  stockSlot(slotIndex: number, productId: string) {
    const slot = this.slots[slotIndex];
    if (slot.product && slot.product.dataId !== productId) {
      console.warn('Slot contains other product');
      return;
    }
    const slotSpace = slot.data.stackLimit - slot.product.stackAmount;
    if (slotSpace <= 0) {
      console.warn('Slot has no space');
      return;
    }
  }
}

export class MachineOrder extends Order<MachineOrderData> {
  machine: Machine;

  constructor(orderId: string) {
    super(orderId, MachineOrders);
    this.machine = new Machine(this.data.machineId);
  }

  deliver(warehouse: Warehouse) {
    warehouse.addMachine(this.data.machineId);
  }
}
