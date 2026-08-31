import { Component, EntityId } from '@jakeklassen/ecs';

export class Contents extends Component {
  constructor(public item: EntityId | null) {
    super();
  }
}
