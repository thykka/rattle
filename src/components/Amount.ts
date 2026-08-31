import { Component } from '@jakeklassen/ecs';

export class Amount extends Component {
  constructor(public value: number) {
    super();
  }
}
