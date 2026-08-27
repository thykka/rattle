import type { World } from '@jakeklassen/ecs';
import { loadData, type LocationId } from '../data/registry.js';
import { LocationDataId } from '../components/DataId.js';

export function spawnLocation(world: World, id: LocationId) {
  const locationData = loadData('locations', id);
  const location = world.createEntity();
  world.addEntityComponents(location, new LocationDataId(id));
}
