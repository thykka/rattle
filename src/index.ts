import { World } from './world.js';
import { DebugView } from './debugView.js';

const world = new World('test');
(window as any).world = world;

world.addWarehouse('tw');
//world.warehouses[0].addProduct('bg');
//world.warehouses[0].addProduct('sb');

world.warehouses[0].addMachineOrder('m-sbd');
world.warehouses[0].addProductOrder('p-bg');
setTimeout(() => world.warehouses[0].addProductOrder('p-bg'), 8000);

setTimeout(() => {
  const machine = world.warehouses[0].machines.shift();
  world.locations[0].addMachine(machine.dataId);
  setTimeout(() => {
    const product = world.warehouses[0].products[0];
    const slot = world.locations[0].machines[0].slots[0];
    // TODO: better interface for moving stuff around?
    slot.addProduct(product.dataId, slot.data.stackLimit);
    product.stackAmount -= slot.data.stackLimit;
  }, 2000);
}, 30000);
// world.warehouses[0].addProductOrder('p-sb');

world.addLocation('tl');
// world.locations[0].machines[0].slots[0].addProduct('bg');
// world.locations[0].machines[0].slots[1].addProduct('bg');
// world.locations[0].addMachine('mbd');
// world.locations[0].machines[1].slots[0].addProduct('sb');
console.log(world);
world.update();

const view = new DebugView(world);
view.draw();
