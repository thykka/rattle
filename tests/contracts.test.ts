import type { ContractAsset } from '../src/contracts.js';
import { init, ContractType } from '../src/contracts.js';

const minimalContract: ContractAsset = {
  title: 'Minimal Test Contract',
  baseBuyPrice: 0,
  baseDailyPrice: 0,
};

describe('Contracts', () => {
  it('initializes a new contract state', () => {
    const result = init(ContractType.TestContract, minimalContract);
    expect(result.type).toBe(ContractType.TestContract);
  });
});
