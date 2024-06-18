import { PlayerState } from './player.js';
import { LocationAssets } from './locations.js';
import { init as initContract } from './contracts.js';
import { init as initMachine } from './machines.js';
import { init as initProduct } from './products.js';

export const init = (element: HTMLElement) => {
  return {
    draw: (player: PlayerState) => {
      const contracts = Object.entries(player.contracts).map(
        ([contractType, contractState]) => contractState
      );
      const locations = Object.entries(player.locations).map(
        ([locationType, locationState]) => locationState
      );
      const machines = Object.entries(player.machines).map(
        ([machineType, machineState]) => machineState
      );
      const unlockedContracts = [...player.unlockedContracts.keys()].map(
        (contractType) => initContract(contractType)
      );
      const unlockedMachines = [...player.unlockedMachines.keys()].map(
        (machineType) => initMachine(machineType)
      );
      const unlockedProducts = [...player.unlockedProducts.keys()].map(
        (productType) => initProduct(productType)
      );
      console.clear();
      console.log('player', player);
      console.log(
        'contracts',
        ...contracts,
        '\navailable contracts',
        ...unlockedContracts
      );
      console.log('locations', ...locations);
      console.log(
        'machines',
        ...machines,
        '\navailable machines',
        ...unlockedMachines
      );
      console.log(
        'products',
        ...machines.flatMap((machine) => machine.products),
        '\navailable products',
        ...unlockedProducts
      );
    },
  };
};
