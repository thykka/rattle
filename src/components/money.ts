import { Component } from '@jakeklassen/ecs';

export class Money extends Component {
  constructor(public amount = 0) {
    super();
  }
}
