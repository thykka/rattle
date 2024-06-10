import { System, World } from '@jakeklassen/ecs';
import { Position } from '../components/position.js';
import { getTime } from '../utils/time.js';
import { Health } from '../components/health.js';

export class CanvasRenderer extends System {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  public update(world: World, deltaTimeMs: number) {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    for (const [_entity, components] of world.view(Position, Health)) {
      const position = components.get(Position);
      const health = components.get(Health);
      console.log(position.value, health.value);
    }
  }
}
