import type { World } from '@jakeklassen/ecs';
import { Position } from '../../components/Position.js';
import { Button } from '../../components/Button.js';

export function spawnCursor(world: World) {
  const cursor = world.createEntity();
  world.addEntityComponents(cursor, new Button(), new Position());
}
