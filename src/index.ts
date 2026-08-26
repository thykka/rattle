import { World } from '@jakeklassen/ecs';
import { Money } from './components/money.js';
import { DebugRenderer } from './systems/DebugRenderer.js';
import { Title } from './components/title.js';
import { Timer } from './components/timer.js';
import { TimerSystem } from './systems/TimerSystem.js';
import { Product } from './components/product.js';
import { Sprite } from './components/sprite.js';
import { SpriteRenderer } from './systems/SpriteRenderer.js';
import { Position } from './components/position.js';
import { Size } from './components/size.js';

const world = new World();
globalThis.world = world;

const player = world.createEntity();

world.addEntityComponents(
  player,
  new Timer(10000, 1000 / 30),
  new Money(10),
  new Title('Bozo')
);

const bubblegum = world.createEntity();
world.addEntityComponents(
  bubblegum,
  new Product('test'),
  new Sprite('bubblegum'),
  new Position(48, 32),
  new Size(64, 64)
);

world.addSystem(new TimerSystem());

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
