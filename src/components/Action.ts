import { Component } from '@jakeklassen/ecs';

export class Action extends Component {
  constructor(public completed: boolean = false) {
    super();
  }
}
