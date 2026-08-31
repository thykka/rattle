import { Component } from '@jakeklassen/ecs';

export class Size extends Component {
  constructor(
    public w = 0,
    public h = 0
  ) {
    super();
  }
}
