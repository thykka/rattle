import { PlayerState } from './player.js';
import { LocationAssets } from './locations.js';
import { ContractAssets } from './contracts.js';
import { MachineAssets } from './machines.js';
import { ProductAssets } from './products.js';

export const init = (element: HTMLElement) => {
  return {
    draw: (player: PlayerState) => {
      console.clear();
      console.table(player);
      const unlockedContracts = [...player.unlockedContracts.keys()].map(
        (contractType) => ContractAssets[contractType]
      );
      console.table(unlockedContracts);
      const contracts = Object.entries(player.contracts).map(
        ([contractType, contractState]) => contractState
      );
      console.table(contracts);
      const locations = Object.entries(player.locations).map(
        ([locationType, locationState]) => locationState
      );
      console.table(locations);
      const machines = [...player.unlockedMachines.keys()].map(
        (machineType) => MachineAssets[machineType]
      );
      console.table(machines);
      const unlockedMachines = Object.entries(player.machines).map(
        ([machineType, machineState]) => machineState
      );
      console.table(unlockedMachines);
      const unlockedProducts = [...player.unlockedProducts.keys()].map(
        (productType) => ProductAssets[productType]
      );
      console.table(unlockedProducts);
    },
  };
};
