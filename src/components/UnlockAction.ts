import { Component } from '@jakeklassen/ecs';

export class UnlockAction extends Component {
  constructor(public target: number) {
    super();
  }
}
