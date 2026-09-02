import { System, World } from '@jakeklassen/ecs';
import { Action } from '../components/Action';
import { UnlockAction } from '../components/UnlockAction';
import { UnlockPrice } from '../components/UnlockPrice';
import { Player } from '../components/Player';
import { Money } from '../components/Money';
import { Locked } from '../components/Locked';

type ComponentView = ReturnType<typeof World.prototype.view>;
type ComponentMap = ComponentView[0];

export class ActionSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    const players = world.view(Player);
    if (players.length === 0) throw Error('Player entity not found');
    const [player] = players;
    const unlockActions = world.view(Action, UnlockAction);
    if (unlockActions.length)
      this.updateUnlockActions(world, player, unlockActions);
    this.cleanupActions(world);
  }

  updateUnlockActions(
    world: World,
    [playerEntity, playerComponents]: ComponentMap,
    actions: ComponentView
  ) {
    const playerMoney = playerComponents.get(Money);

    for (const [actionEntity, actionComponents] of actions) {
      const { target } = actionComponents.get(UnlockAction);
      const targetComponents = world.getEntityComponents(target);
      const unlockPrice = targetComponents.get(UnlockPrice);

      if (playerMoney.value >= unlockPrice.value) {
        playerMoney.value -= unlockPrice.value;
        world.removeEntityComponents(target, Locked);
      }
    }
  }

  cleanupActions(world) {
    for (const [entity, components] of world.view(Action)) {
      world.deleteEntity(entity);
    }
  }
}
