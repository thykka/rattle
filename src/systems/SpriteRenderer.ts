import { System, type World } from '@jakeklassen/ecs';
import { Sprite } from '../components/sprite.js';
import { Position } from '../components/position.js';
import { Size } from '../components/size.js';

export class SpriteRenderer extends System {
  #ctx: CanvasRenderingContext2D;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly spriteSheet: HTMLImageElement,
    public tileSize = 16
  ) {
    super();
    this.#ctx = this.canvas.getContext('2d');
    this.#ctx.imageSmoothingEnabled = false;
  }

  public update(world: World, dt: number) {
    for (const [entity, components] of world.view(Sprite, Position, Size)) {
      this.drawSprite(
        components.get(Sprite),
        components.get(Position),
        components.get(Size)
      );
    }
  }

  drawSprite(sprite: Sprite, position: Position, size: Size): void {
    this.#ctx.drawImage(
      this.spriteSheet,
      sprite.position.x * this.tileSize,
      sprite.position.y * this.tileSize,
      sprite.size.x * this.tileSize,
      sprite.size.y * this.tileSize,
      position.x,
      position.y,
      size.x,
      size.y
    );
  }
}
