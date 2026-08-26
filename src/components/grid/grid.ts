import { Component } from '@jakeklassen/ecs';

export class Cell extends Component {
  constructor() {
    super();
  }
}

export class Grid extends Component {
  constructor(
    public rows: number,
    public columns: number
  ) {
    super();
  }
}
