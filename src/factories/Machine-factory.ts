import type { World } from '@jakeklassen/ecs';
import { loadData, type MachineId, type SlotId } from '../data/registry.js';
import { MachineDataId, SlotDataId } from '../components/DataId.js';
import { Size } from '../components/Size.js';
import { Shape } from '../components/Shape.js';
import { Parent } from '../components/Parent.js';
import { Contents } from '../components/Contents.js';
import { Money } from '../components/Money.js';

export function spawnMachine(world: World, id: MachineId) {
  const machineData = loadData('machines', id);
  const machine = world.createEntity();
  world.addEntityComponents(machine, new MachineDataId(id), new Money(0));
  machineData.slots.forEach((row) => {
    row.forEach((slotId) => {
      const slotData = loadData('slots', slotId as SlotId);
      const slot = world.createEntity();
      world.addEntityComponents(
        slot,
        new SlotDataId(slotId as SlotId),
        new Parent(machine),
        new Size(slotData.width, slotData.height),
        new Shape(slotData.shape),
        new Contents(null)
      );
    });
  });
}
