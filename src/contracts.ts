import { modifyMoney, type PlayerState } from './player.js';
import {
  LocationType,
  attach as attachLocation,
  init as initLocation,
} from './locations.js';
import {
  MachineType,
  attach as attachMachine,
  init as initMachine,
} from './machines.js';
import { ProductType } from './products.js';

export enum ContractType {
  TestContract,
  StartBusiness,
  RentSideStreet,
  RentCentralStation,
}

export type ContractAsset = {
  title: string;
  baseBuyPrice: number; // How much it costs to unlock this contract
  baseDailyPrice: number; // How much it costs to keep this contract active
  providesLocations?: LocationType[];
  unlocksMachines?: MachineType[];
  unlocksProducts?: ProductType[];
  unlocksContracts?: ContractType[];
};

export const ContractAssets: Record<string, ContractAsset> = {
  [ContractType.StartBusiness]: {
    title: 'Starter kit',
    baseBuyPrice: 1,
    baseDailyPrice: 0,
    providesLocations: [LocationType.Home],
    unlocksMachines: [MachineType.ToyVendingMachine],
    unlocksProducts: [ProductType.BubblegumBall],
    unlocksContracts: [ContractType.RentSideStreet],
  },
  [ContractType.RentSideStreet]: {
    title: 'Rent Side Street',
    baseBuyPrice: 10,
    baseDailyPrice: 1,
    providesLocations: [LocationType.SideStreet],
    unlocksMachines: [MachineType.BallDispenser],
    unlocksProducts: [ProductType.FlashingSticker, ProductType.SlimeHand],
    unlocksContracts: [ContractType.RentCentralStation],
  },
  [ContractType.RentCentralStation]: {
    title: 'Rent Central Station',
    baseBuyPrice: 1000,
    baseDailyPrice: 200,
    providesLocations: [LocationType.CentralStation],
    unlocksMachines: [MachineType.SnackDispenser],
  },
} as const;

export type ContractState = ContractAsset & {
  type: ContractType; // asset's key
  buyPrice: number;
  rent: number;
};

const getBuyPrice = (contract: ContractState, player: PlayerState): number => {
  return contract.baseBuyPrice;
};
const getRent = (contract: ContractState, player: PlayerState): number => {
  return contract.baseDailyPrice;
};

export const init = (
  type: ContractType,
  newAsset?: ContractAsset
): ContractState => {
  const asset = newAsset ?? ContractAssets[type];
  if (!asset) throw new Error('Unknown contract: ' + type);
  const contract: ContractState = {
    type,
    ...asset,
    buyPrice: asset.baseBuyPrice,
    rent: asset.baseDailyPrice,
  };
  return contract;
};

export const attach = (contract: ContractState, player: PlayerState) => {
  if (player.contracts[contract.type])
    throw new Error('Already have contract: ' + contract.type);

  contract.buyPrice = getBuyPrice(contract, player);
  contract.rent = getRent(contract, player);

  if (player.money < contract.buyPrice)
    throw new Error(
      `Not enough money for contract ${player.money}/${contract.buyPrice}`
    );

  player.contracts[contract.type] = contract;
  contract.unlocksContracts?.forEach((contractType) => {
    player.unlockedContracts.set(contractType, true);
  });
  contract.providesLocations?.forEach((locationType) => {
    if (!player.locations[locationType]) {
      attachLocation(initLocation(locationType), player);
    }
  });
  contract.unlocksMachines?.forEach((machineType) => {
    player.unlockedMachines.set(machineType, true);
  });
};

export const step = (
  contract: ContractState,
  player: PlayerState,
  deltaTime: number
): void => {
  try {
    modifyMoney((-contract.rent * deltaTime) / 1000, player);
  } catch (e) {
    console.warn(e);
  }
};
