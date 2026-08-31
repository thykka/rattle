import { System, World } from '@jakeklassen/ecs';
import { ButtonAction } from '../components/ButtonAction.js';

export const KnownActions = {
  'move-money': {
    fn: (world: World) => {},
  },
} as const;

export class ActionSystem extends System {
  constructor() {
    super();
  }

  update(world: World, dt: number) {
    for (const [entity, components] of world.view(ButtonAction)) {
      const action = components.get(ButtonAction);
      const actionData = KnownActions[action.actionId];
      if (!actionData) continue;
      actionData.fn(world);
    }
  }
}
