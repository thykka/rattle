import { Component, EntityId } from '@jakeklassen/ecs';

export class Children extends Component {
  public entities: Set<EntityId> = new Set();
}
