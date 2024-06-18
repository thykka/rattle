import { LocationState, LocationType } from './locations.js';
import { PlayerState, modifyMoney } from './player.js';
import { ProductState, ProductTag, step as stepProduct } from './products.js';

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
  baseMaxProducts: number; // How many slots can be used
  productTagsAllowed?: ProductTag[]; // Which products can be loaded in slots
};

export const MachineAssets: Partial<Record<MachineType, MachineAsset>> = {
  [MachineType.ToyVendingMachine]: {
    title: 'Toy Vending Machine',
    baseBuyPrice: 0,
    baseMaxMoney: 10,
    baseMaxProducts: 1,
    productTagsAllowed: [ProductTag.Gum],
  },
  [MachineType.BallDispenser]: {
    title: 'Ball Dispenser',
    baseBuyPrice: 1000,
    baseMaxMoney: 100,
    baseMaxProducts: 2,
    productTagsAllowed: [ProductTag.Gum, ProductTag.Toy, ProductTag.Accessory],
  },
  [MachineType.SnackDispenser]: {
    title: 'Snack Dispenser',
    baseBuyPrice: 10000,
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
  buyPrice: number; // Cost of this machine
  money: number; // How much money in machine's storage
  maxProducts: number; // How many slots
  products: ProductState[];
};
const getBuyPrice = (machine: MachineState, player: PlayerState) => {
  const matchingMachines = Object.values(player.machines).filter(
    (m) => m.type === machine.type
  ).length;
  return (
    machine.baseBuyPrice + matchingMachines * Math.max(1, machine.baseBuyPrice)
  );
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
    buyPrice: asset.baseBuyPrice,
    maxProducts: asset.baseMaxProducts,
    money: 0,
    products: [],
  };
  return machine;
};

const update = (machine: MachineState, player: PlayerState) => {
  machine.buyPrice = getBuyPrice(machine, player);
  machine.maxProducts = getMaxProducts(machine, player);
};

export const attach = (
  machine: MachineState,
  location: LocationType,
  player: PlayerState
) => {
  if (!player.unlockedMachines.get(machine.type))
    throw new Error('Machine is locked: ' + machine.type);

  update(machine, player);
  modifyMoney(-machine.buyPrice, player);

  player.machines[machine.id] = machine;
  player.locations[location].machines.push(machine.id);
};

export const step = (
  machine: MachineState,
  location: LocationState,
  player: PlayerState,
  deltaTime: number
): void => {
  update(machine, player);

  machine.products.forEach((product) => {
    stepProduct(product, machine, location, player, deltaTime);
  });
};

export const stockProduct = (
  product: ProductState,
  machineId: MachineId,
  player: PlayerState
) => {
  const { products, maxProducts, productTagsAllowed } =
    player.machines[machineId];
  if (
    productTagsAllowed &&
    !product.tags.some((tag) => productTagsAllowed.includes(tag))
  ) {
    throw new Error(
      `Product ${product.title} not allowed in machine ${machineId}`
    );
  }
  if (products.length >= maxProducts)
    throw new Error('Machine cannot take more products: ' + machineId);
  products.push(product);
};
