import { Component } from '@jakeklassen/ecs';

export class Sprite extends Component {
  constructor(
    public sx = 0,
    public sy = 0,
    public sw = 1,
    public sh = 1
  ) {
    super();
  }
}
