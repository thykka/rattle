import { System, World } from '@jakeklassen/ecs';
import { Button } from '../../components/Button.js';
import { Position } from '../../components/Position.js';
import { Size } from '../../components/Size.js';
import { Name } from '../../components/Name.js';
import { MouseButton } from '../../components/MouseButton.js';
import { collidesPointBox } from '../../shared/collision.js';

const FontSize = 16;
const ButtonStates = {
  default: {
    color: '#000',
    background: '#eee',
  },
  hovered: {
    color: '#222',
    background: '#bbb',
  },
  pressed: {
    color: '#000',
    background: '#888',
  },
};

export class ButtonRenderer extends System {
  private ctx: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    super();
    this.ctx = canvas.getContext('2d');
    this.ctx.font = `${FontSize}px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }

  update(world: World, dt: number) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const [[cursorEntity, cursorComponents]] = world.view(
      MouseButton,
      Position
    );
    const mousePosition = cursorComponents.get(Position);
    const mouseButton = cursorComponents.get(MouseButton);
    const clientRect = this.canvas.getBoundingClientRect();
    const mouseX = mousePosition.x - clientRect.left;
    const mouseY = mousePosition.y - clientRect.top;

    for (const [entity, components] of world.view(
      Button,
      Name,
      Position,
      Size
    )) {
      const button = components.get(Button);
      const label = components.get(Name);
      const position = components.get(Position);
      const size = components.get(Size);

      let theme = ButtonStates.default;
      if (
        collidesPointBox(mouseX, mouseY, position.x, position.y, size.w, size.h)
      ) {
        theme = ButtonStates.hovered;
        if (mouseButton.held) {
          theme = ButtonStates.pressed;
        }
      }
      this.ctx.fillStyle = theme.background;
      this.ctx.fillRect(position.x, position.y, size.w, size.h);
      const labelX = position.x + size.w / 2;
      const labelY = position.y + size.h / 2;
      this.ctx.fillStyle = theme.color;
      this.ctx.fillText(label.text, labelX, labelY, size.w);
    }
  }
}
