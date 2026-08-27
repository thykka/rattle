import { Component } from '@jakeklassen/ecs';

export class Money extends Component {
  constructor(public value = 0) {
    super();
  }
}
