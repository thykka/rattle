import { System, World } from '@jakeklassen/ecs';

type ButtonState = {
  down: boolean;
  up: boolean;
  held: boolean;
};

type PointerButtonState = ButtonState & {
  x: number;
  y: number;
};

export class Input extends System {
  private element: HTMLElement;
  public buttons: Record<string, ButtonState | PointerButtonState> = {
    pointer: {
      up: false,
      down: false,
      held: false,
      x: 0,
      y: 0,
    },
  };
  private boundPointerDown = this.handlePointerDown.bind(this);
  private boundPointerUp = this.handlePointerUp.bind(this);
  private boundPointerMove = this.handlePointerMove.bind(this);

  constructor(element: HTMLElement) {
    super();
    this.element = element;
    this.element.addEventListener('mousemove', this.boundPointerMove);
    this.element.addEventListener('mousedown', this.boundPointerDown);
  }

  private handlePointerDown(event: MouseEvent) {
    this.element.removeEventListener('mousedown', this.boundPointerDown);
    this.element.addEventListener('mouseup', this.boundPointerUp);
    this.element.addEventListener('mouseleave', this.boundPointerUp);
    Object.assign(this.buttons.pointer, {
      down: true,
      x: event.clientX,
      y: event.clientY,
    });
  }

  private handlePointerUp(event: MouseEvent) {
    this.element.removeEventListener('mouseup', this.boundPointerUp);
    this.element.removeEventListener('mouseleave', this.boundPointerUp);
    this.element.addEventListener('mousedown', this.boundPointerDown);
    Object.assign(this.buttons.pointer, {
      up: true,
      x: event.clientX,
      y: event.clientY,
    });
  }

  private handlePointerMove(event: MouseEvent) {
    Object.assign(this.buttons.pointer, {
      x: event.clientX,
      y: event.clientY,
    });
  }

  private updateButton(button: ButtonState) {
    if (button.up && !button.held) button.up = false;
    if (button.up && button.held) button.held = false;
    if (button.down && button.held) button.down = false;
    if (button.down) button.held = true;
  }

  public update(world: World, deltaTimeMs: number) {
    for (const buttonState of Object.values(this.buttons)) {
      this.updateButton(buttonState);
    }
  }
}
