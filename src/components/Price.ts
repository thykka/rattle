import { Component } from '@jakeklassen/ecs';

export class Price extends Component {
  constructor(public value: number = 0) {
    super();
  }
}
