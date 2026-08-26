import { Component } from '@jakeklassen/ecs';
import { Vec2 } from '../utils/Vec2.js';

export class Vec2Component extends Component {
  public xy: Vec2;
  constructor(x = 0, y = 0) {
    super();
    this.xy = new Vec2(x, y);
  }

  get x() {
    return this.xy.x;
  }
  get y() {
    return this.xy.y;
  }
  set x(x: number) {
    this.xy.x = x;
  }
  set y(y: number) {
    this.xy.y = y;
  }
}
