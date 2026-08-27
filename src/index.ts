import { World } from '@jakeklassen/ecs';
import { Money } from './components/Money.js';
import { DebugRenderer } from './systems/DebugRenderer.js';
import { SpriteRenderer } from './systems/SpriteRenderer.js';
import { spawnProductStack } from './factories/Product-factory.js';
import { Name } from './components/Name.js';
import { spawnMachine } from './factories/Machine-factory.js';

const world = new World();
globalThis.world = world;

const player = world.createEntity();

world.addEntityComponents(player, new Name('Bozo'), new Money(10));

spawnProductStack(world, 'bubblegum', 64, 32);
spawnProductStack(world, 'bouncyball', 96, 48);

spawnMachine(world, 'gumball-row', player /* TODO: warehouse/location */);

const spriteCanvas = document.createElement('canvas');
document.body.appendChild(spriteCanvas);
const spriteSheet = document.querySelector<HTMLImageElement>(
  'img[data-spritesheet]'
);
world.addSystem(new SpriteRenderer(spriteCanvas, spriteSheet));

const debugElement = document.createElement('div');
debugElement.style.whiteSpace = 'pre-wrap';
debugElement.style.fontFamily = 'monospace';
document.body.appendChild(debugElement);
world.addSystem(new DebugRenderer(debugElement));

let lastUpdate = performance.now();
const update = (currentTime: DOMHighResTimeStamp) => {
  const deltaTime = Math.min(1000, currentTime - lastUpdate);
  world.updateSystems(deltaTime);
  lastUpdate = currentTime;
  requestAnimationFrame(update);
};

requestAnimationFrame(update);
