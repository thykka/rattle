import {
  ContractState,
  ContractType,
  step as stepContract,
} from './contracts.js';
import {
  LocationType,
  LocationState,
  step as stepLocation,
} from './locations.js';
import type { MachineId, MachineState, MachineType } from './machines.js';
import { ProductType } from './products.js';

export type PlayerState = {
  title: string;
  money: number;
  locations: Partial<Record<LocationType, LocationState>>;
  contracts: Partial<Record<ContractType, ContractState>>;
  machines: Record<MachineId, MachineState>;
  unlockedContracts: Map<ContractType, boolean>;
  unlockedMachines: Map<MachineType, boolean>;
  unlockedProducts: Map<ProductType, boolean>;
};

export const init = (): PlayerState => ({
  title: 'Jane Doe',
  money: 10,
  locations: {},
  contracts: {},
  machines: {},
  unlockedContracts: new Map(),
  unlockedMachines: new Map(),
  unlockedProducts: new Map(),
});

export const step = (player: PlayerState, deltaTime: number): void => {
  // process contracts
  Object.values(player.contracts).forEach((contract) =>
    stepContract(contract, player, deltaTime)
  );
  // process locations
  Object.values(player.locations).forEach((location) => {
    stepLocation(location, player, deltaTime);
  });
};

export const modifyMoney = (amount: number, player: PlayerState): void => {
  if (player.money + amount < 0) throw new Error('Not enough money');
  player.money += amount;
};
