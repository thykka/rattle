import type { World } from '@jakeklassen/ecs';
import { Name } from '../components/Name.js';
import { Money } from '../components/Money.js';

export function spawnPlayer(world: World): number {
  const player = world.createEntity();
  world.addEntityComponents(player, new Name('Player 1'), new Money());
  return player;
}
