import { System, World } from '@jakeklassen/ecs';
import { Position } from './components/position.js';
import { Health } from './components/health.js';
import { getTime } from './utils/time.js';
import { CanvasRenderer } from './systems/canvas-renderer.js';
import { Input } from './systems/input.js';
import { Vector2d } from './vector2d.js';
import { PlayerController } from './systems/player-controller.js';

const world = new World();

const canvas = document.querySelector('canvas#rattle') as HTMLCanvasElement;
world.addSystem(new Input(canvas));
world.addSystem(new CanvasRenderer(canvas));

world.addSystem(new PlayerController());

const rat = world.createEntity();
world.addEntityComponents(
  rat,
  new Position(new Vector2d(canvas.width / 2, canvas.height / 2)),
  new Health(10)
);
const enemy = world.createEntity();
world.addEntityComponents(enemy, new Position(), new Health(1));

let lastUpdateMs = getTime();

const frame = (timeMs: number) => {
  const deltaTimeMs = timeMs - lastUpdateMs;
  lastUpdateMs = timeMs;
  world.updateSystems(deltaTimeMs);

  setTimeout(() => frame(getTime()), 1000 / 2);
};

frame(getTime());
