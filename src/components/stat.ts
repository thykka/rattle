import { Component } from '@jakeklassen/ecs';

export class Stat extends Component {
  constructor(public value: any) {
    super();
  }
}
