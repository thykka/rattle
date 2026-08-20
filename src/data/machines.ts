import type { MachineData } from '../machine.js';

export const Machines: MachineData[] = [
  {
    id: 'sbd',
    title: 'Small ball dispenser',
    locationWidth: 1,
    locationHeight: 2,
    slotsWidth: 1,
    slotsHeight: 1,
    slots: [
      {
        dataId: 'round',
        top: 0,
        left: 0,
      },
    ],
  },
];
