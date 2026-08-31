import type { World } from '@jakeklassen/ecs';
import { loadData, type WarehouseId } from '../data/registry.js';
import { WarehouseDataId } from '../components/DataId.js';

export function spawnWarehouse(world: World, id: WarehouseId) {
  const machineData = loadData('warehouses', id);
  const machine = world.createEntity();
  world.addEntityComponents(machine, new WarehouseDataId(id));
}
