import { Component, EntityId } from '@jakeklassen/ecs';

export class Parent extends Component {
  constructor(public entity: EntityId | null) {
    super();
  }
}
