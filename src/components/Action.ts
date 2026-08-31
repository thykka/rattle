import { Component } from '@jakeklassen/ecs';

export class Action<ActionData> extends Component {
  constructor(
    public actionId: string,
    public data: ActionData
  ) {
    super();
  }
}
