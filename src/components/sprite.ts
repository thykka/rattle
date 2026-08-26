import { Component } from '@jakeklassen/ecs';

import Data from '../data/sprites.json';
import { Vec2 } from '../utils/Vec2.js';

type RawSpriteData = typeof Data;
export type SpriteId = keyof RawSpriteData;

export class Sprite extends Component {
  public position: Vec2;
  public size: Vec2;

  constructor(public id: SpriteId) {
    const data = Data[id];
    if (!data) throw Error(`Unknown sprite: ${id}`);
    super();
    const [x, y, w, h] = data.source;
    this.position = new Vec2(x, y);
    this.size = new Vec2(w, h);
  }
}
