import { Component } from '@jakeklassen/ecs';

export class Button extends Component {
  constructor(
    public pressed = false,
    public held = false,
    public released = false
  ) {
    super();
  }
}
