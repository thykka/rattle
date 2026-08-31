import { World } from '@jakeklassen/ecs';
import { Money } from './components/Money.js';
import { DebugRenderer } from './systems/DebugRenderer.js';
import { SpriteRenderer } from './systems/SpriteRenderer.js';
import { spawnProductStack } from './factories/Product-factory.js';
import { Name } from './components/Name.js';
import { spawnMachine } from './factories/Machine-factory.js';
import { InputCursor } from './systems/input/InputCursor.js';
import { spawnCursor } from './factories/input/Cursor-factory.js';
import { ButtonRenderer } from './systems/ui/ButtonRenderer.js';
import { spawnButton } from './factories/Button-factory.js';
import { ActionSystem } from './systems/ActionSystem.js';
import { initView } from './shared/layout.js';

const world = new World();
globalThis.world = world;

const player = world.createEntity();

world.addEntityComponents(player, new Name('Bozo'), new Money(10));

spawnProductStack(world, 'bubblegum', 64, 32);
spawnProductStack(world, 'bouncyball', 96, 48);

spawnMachine(world, 'gumball-row', player /* TODO: warehouse/location */);

spawnCursor(world);
world.addSystem(new InputCursor(globalThis));

world.addSystem(new ActionSystem());

spawnButton(world, {
  x: 0,
  y: 0,
  w: 128,
  h: 32,
  label: 'earn-money',
  action: 'move-money',
  actionTarget: player,
});

spawnButton(world, {
  x: 130,
  y: 0,
  w: 128,
  h: 32,
  label: 'lose-money',
  action: 'move-money',
  actionSource: player,
});

const buttonsCanvas = document.createElement('canvas');
document.body.appendChild(buttonsCanvas);
world.addSystem(new ButtonRenderer(buttonsCanvas));

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

const view = initView('main');
document.body.appendChild(view);
