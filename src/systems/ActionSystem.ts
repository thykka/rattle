import { System, World } from '@jakeklassen/ecs';
import { Action } from '../components/Action';
import { UnlockAction } from '../components/UnlockAction';
import { UnlockPrice } from '../components/UnlockPrice';
import { Player } from '../components/Player';
import { Money } from '../components/Money';
import { Locked } from '../components/Locked';

export class ActionSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    this.updateUnlockActions(world);
    for (const [entity, components] of world.view(Action)) {
      world.deleteEntity(entity);
    }
  }

  updateUnlockActions(world: World) {
    const [[player, playerComponents]] = world.view(Player);
    const playerMoney = playerComponents.get(Money);

    for (const [actionEntity, actionComponents] of world.view(
      Action,
      UnlockAction
    )) {
      const { target } = actionComponents.get(UnlockAction);
      const targetComponents = world.getEntityComponents(target);
      const targetUnlockPrice = targetComponents.get(UnlockPrice);

      if (playerMoney.value >= targetUnlockPrice.value) {
        playerMoney.value -= targetUnlockPrice.value;
        world.removeEntityComponents(target, Locked);
      }
    }
  }
}
