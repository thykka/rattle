import type { MachineAsset } from '../src/machines.js';
import { MachineType, init } from '../src/machines.js';

const testMachine1: MachineAsset = {
  title: 'Test Machine',
  baseBuyPrice: 0,
  baseMaxProducts: 1,
  baseMaxMoney: 1,
};

describe('Machines', () => {
  it('initializes a new machine state', () => {
    const result = init(MachineType.TestMachine, testMachine1);
    expect(typeof result.id).toBe('string');
    expect(result.id.length).toBeGreaterThanOrEqual(4);
  });
});
