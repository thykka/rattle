import { Component } from '@jakeklassen/ecs';
import { Vector2d } from '../vector2d.js';

export class Position extends Component {
  constructor(public value = new Vector2d(0, 0)) {
    super();
  }
}
