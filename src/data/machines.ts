import type { MachineOrderData, MachineData } from '../machine.js';

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
        dataId: 'sd',
        top: 0,
        left: 0,
      },
      {
        dataId: 'sd',
        top: 0,
        left: 1,
      },
    ],
  },
  {
    id: 'mbd',
    title: 'Medium ball dispenser',
    locationWidth: 1,
    locationHeight: 2,
    slotsWidth: 2,
    slotsHeight: 2,
    slots: [
      {
        dataId: 'md',
        top: 0,
        left: 0,
      },
    ],
  },
];

export const MachineOrders: MachineOrderData[] = [
  {
    id: 'm-sbd',
    title: 'Gumball dispenser',
    machineId: 'sbd',
    price: 100,
    duration: 20,
  },
  {
    id: 'm-mbd',
    title: 'Superball dispenser',
    machineId: 'mbd',
    price: 150,
    duration: 30,
  },
];
