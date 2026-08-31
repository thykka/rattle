import { System, type World } from '@jakeklassen/ecs';
import { MouseButton } from '../../components/MouseButton.js';
import { Position } from '../../components/Position.js';

export class InputCursor extends System {
  private x = 0;
  private y = 0;
  private held = false;

  constructor(public window: typeof globalThis) {
    super();
    const boundMove = this.move.bind(this);
    window.addEventListener('mousemove', boundMove);
    const boundDown = this.down.bind(this);
    window.addEventListener('mousedown', boundDown);
    const boundUp = this.up.bind(this);
    window.addEventListener('mouseup', boundUp);
  }

  update(world: World, dt: number) {
    for (const [cursorEntity, components] of world.view(
      MouseButton,
      Position
    )) {
      const button = components.get(MouseButton);
      const position = components.get(Position);
      position.x = this.x;
      position.y = this.y;

      if (this.held) {
        if (!button.held) {
          button.pressed = true;
        } else if (button.pressed) {
          button.pressed = false;
        }
        button.held = true;
      } else {
        if (button.held) {
          button.released = true;
        } else if (button.released) {
          button.released = false;
        }
        button.held = false;
      }
    }
  }

  move(event: MouseEvent): void {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  down(event: MouseEvent): void {
    this.held = true;
  }

  up(event: MouseEvent): void {
    this.held = false;
  }
}
