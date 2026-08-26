import { Component } from '@jakeklassen/ecs';

export class Title extends Component {
  constructor(public text = '??') {
    super();
  }
}
