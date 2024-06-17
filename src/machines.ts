import { LocationState } from './locations.js';
import { PlayerState } from './player.js';
import { ProductState, ProductTag } from './products.js';

export type MachineId = string;

export enum MachineType {
  TestMachine,
  ToyVendingMachine,
  BallDispenser,
  SnackDispenser,
}

export type MachineAsset = {
  title: string;
  baseBuyPrice: number; // How much does a single machine cost
  baseMaxMoney: number; // How much money can the machine store before sales cease
  baseAvailable: number; // How many of these machines can be bought
  baseMaxProducts: number; // How many slots can be used
  productTagsAllowed?: ProductTag[]; // Which products can be loaded in slots
};

export const MachineAssets: Partial<Record<MachineType, MachineAsset>> = {
  [MachineType.ToyVendingMachine]: {
    title: 'Toy Vending Machine',
    baseBuyPrice: 0,
    baseMaxMoney: 10,
    baseAvailable: 1,
    baseMaxProducts: 1,
    productTagsAllowed: [ProductTag.Gum],
  },
  [MachineType.BallDispenser]: {
    title: 'Ball Dispenser',
    baseBuyPrice: 1000,
    baseAvailable: 10,
    baseMaxMoney: 100,
    baseMaxProducts: 2,
    productTagsAllowed: [ProductTag.Gum, ProductTag.Toy, ProductTag.Accessory],
  },
  [MachineType.SnackDispenser]: {
    title: 'Snack Dispenser',
    baseBuyPrice: 10000,
    baseAvailable: 10,
    baseMaxMoney: 2000,
    baseMaxProducts: 4,
    productTagsAllowed: [ProductTag.Snack, ProductTag.Candy, ProductTag.Gum],
  },
} as const;

export type MachineSlotState = {
  index: number;
  product: ProductState;
};

export type MachineState = MachineAsset & {
  id: MachineId; // generated
  type: MachineType;
  available: number; // How many can be purchased
  buyPrice: number; // Cost of this machine
  money: number; // How much money in machine's storage
  maxProducts: number; // How many slots
  products: ProductState[];
};
const getAvailable = (machine: MachineState, player: PlayerState) => {
  return machine.baseAvailable;
};
const getBuyPrice = (machine: MachineState, player: PlayerState) => {
  return machine.baseBuyPrice;
};
const getMaxProducts = (machine: MachineState, player: PlayerState) => {
  return machine.baseMaxProducts;
};

export const init = (
  type: MachineType,
  machineAsset?: MachineAsset
): MachineState => {
  const asset = machineAsset ?? MachineAssets[type];
  if (!asset) throw new Error('Unknown machine: ' + type);
  const machine = {
    type,
    id: Math.random().toString(36).slice(-8).replace(/\./, ''),
    ...asset,
    available: asset.baseAvailable,
    buyPrice: asset.baseBuyPrice,
    maxProducts: asset.baseMaxProducts,
    money: 0,
    products: [],
  };
  return machine;
};

export const attach = (machine: MachineState, player: PlayerState) => {
  machine.available = getAvailable(machine, player);
  machine.buyPrice = getBuyPrice(machine, player);
  machine.maxProducts = getMaxProducts(machine, player);

  player.machines[machine.id] = machine;
  player.unlockedMachines.set(machine.type, true);
};

export const step = (
  machine: MachineState,
  location: LocationState,
  player: PlayerState,
  deltaTime: number
): void => {
  // sell stuff!
};
