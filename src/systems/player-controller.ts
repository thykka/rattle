import { System, World } from '@jakeklassen/ecs';
import { Player } from '../components/player.js';

export class PlayerController extends System {
  constructor() {
    super();
  }

  public update(world: World, deltaTimeMs: number) {
    const component = world.findEntity(Player);
  }
}
