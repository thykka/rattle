import { StateData, type CommonData } from './data.js';
import { Machine } from './machine.js';
import { Modifier } from './modifier.js';
import { Product } from './product.js';
import { Warehouses } from './data/warehouses.js';
import type { World } from './world.js';
import { ProductOrder } from './product.js';
import { MachineOrder } from './machine.js';

export type WarehouseData = CommonData & {
  width: number;
  height: number;
  stackLimit: number;
  productLimit: number;
  machineLimit: number;
};

export class Warehouse extends StateData<WarehouseData> {
  machines: Machine[] = [];
  modifiers: Modifier[] = [];
  orders: (ProductOrder | MachineOrder)[] = [];
  products: Product[] = [];

  constructor(dataId: string) {
    super(dataId, Warehouses);
  }

  tick(world: World) {
    this.modifiers.forEach((modifier) => modifier.tick(world, this));
    this.orders.forEach((order) => order.tick(world, this));
    this.orders = this.orders.filter((o) => !o.delivered);
  }

  canAddMachine(): boolean {
    return this.data.machineLimit >= this.machines.length;
  }

  addMachine(machineId: string) {
    const machine = new Machine(machineId);
    this.machines.push(machine);
  }

  findProduct(productId: string) {
    return this.products.find((product) => product.dataId === productId);
  }

  canAddProduct(productId: string, amount: number): boolean {
    const matching = this.findProduct(productId);
    if (matching) {
      const stackOverflow =
        matching.stackAmount + amount - this.data.stackLimit;
      return stackOverflow <= 0;
    }
    return this.products.length < this.data.productLimit;
  }

  addProduct(productId: string, amount: number): void {
    const matching = this.findProduct(productId);
    if (matching) {
      matching.stackAmount = Math.min(
        this.data.stackLimit,
        matching.stackAmount + amount
      );
      return;
    }
    if (this.products.length >= this.data.productLimit) {
      console.warn('Not enough product space in warehouse');
      return;
    }
    const product = new Product(productId, amount);
    this.products.push(product);
  }

  addProductOrder(orderId: string) {
    const order = new ProductOrder(orderId);
    if (!this.canAddProduct(order.data.productId, order.data.productStacks)) {
      console.warn('Not enough product space in warehouse');
      return;
    }
    this.orders.push(order);
  }

  addMachineOrder(orderId: string) {
    const order = new MachineOrder(orderId);
    if (!this.canAddMachine()) {
      console.warn('Not enough machine space in warehouse');
      return;
    }
    this.orders.push(order);
  }
}
