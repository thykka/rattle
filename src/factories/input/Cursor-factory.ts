import type { World } from '@jakeklassen/ecs';
import { Position } from '../../components/Position.js';
import { MouseButton } from '../../components/MouseButton.js';

export function spawnCursor(world: World) {
  const cursor = world.createEntity();
  world.addEntityComponents(cursor, new MouseButton(), new Position());
}
