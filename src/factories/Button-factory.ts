import { World } from '@jakeklassen/ecs';
import { Button } from '../components/Button.js';
import { ButtonAction, ButtonActionData } from '../components/ButtonAction.js';
import { Name } from '../components/Name.js';
import { Position } from '../components/Position.js';
import { Size } from '../components/Size.js';

export type ButtonOptions = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;

  action?: string;
  actionSource?: ButtonActionData['source'];
  actionTarget?: ButtonActionData['target'];
};

export function spawnButton(world: World, options: ButtonOptions) {
  const button = world.createEntity();
  world.addEntityComponents(
    button,
    new Button(),
    new Name(options.label),
    new Position(options.x, options.y),
    new Size(options.w, options.h)
  );
  if (options.action) {
    const action = new ButtonAction(options.action, {
      source: button,
      target: options.actionTarget,
    });
    world.addEntityComponents(button, action);
  }
}
