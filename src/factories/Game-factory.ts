import { World } from '@jakeklassen/ecs';
import { spawnPlayer } from './Player-factory';
import { spawnLocations } from './Location-factory';
import { spawnMachines } from './Machine-factory';

export function spawnGame(): World {
  const world = new World();
  globalThis.world = world;
  globalThis.player = spawnPlayer(world);
  spawnLocations(world);
  spawnMachines(world);
  return world;
}
