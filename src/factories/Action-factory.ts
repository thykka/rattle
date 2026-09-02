import { World } from '@jakeklassen/ecs';
import { Action } from '../components/Action';
import { UnlockAction } from '../components/UnlockAction';

export function spawnAction(world: World): number {
  const action = world.createEntity();
  world.addEntityComponents(action, new Action());
  return action;
}

export function spawnUnlockAction(world: World, unlockable: number): number {
  const action = world.createEntity();
  world.addEntityComponents(action, new Action(), new UnlockAction(unlockable));
  return action;
}
