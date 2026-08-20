import { World } from './world.js';

const world = new World('test', []);
console.log(world);

world.addLocation('tl');
world.addWarehouse('tw');

console.log(JSON.stringify(world, null, 2));
world.update();
console.log(world);
