import { LocationState } from './locations.js';
import { MachineId, MachineState, stockProduct } from './machines.js';
import { PlayerState, modifyMoney } from './player.js';

export enum ProductTag {
  Drink,
  Snack,
  Gum,
  Candy,
  Toy,
  Accessory,
  Jewelry,
}

export enum ProductType {
  TestProduct,
  BubblegumBall,
  SlimeHand,
  FlashingSticker,
}

export type ProductAsset = {
  title: string;
  baseBuyPrice: number; // How much a full stack of product costs
  baseSellPrice: number; // How much money player gets per product
  baseStackSize: number; // How many products fit in stack
  tags: ProductTag[];
};

export const ProductAssets: Partial<Record<string, ProductAsset>> = {
  [ProductType.BubblegumBall]: {
    title: 'Bubblegum Ball',
    baseBuyPrice: 5,
    baseSellPrice: 2,
    baseStackSize: 100,
    tags: [ProductTag.Gum],
  },
  [ProductType.SlimeHand]: {
    title: 'Slime Hand',
    baseBuyPrice: 2,
    baseSellPrice: 5,
    baseStackSize: 50,
    tags: [ProductTag.Toy],
  },
  [ProductType.FlashingSticker]: {
    title: 'Flashing Sticker',
    baseBuyPrice: 5,
    baseSellPrice: 10,
    baseStackSize: 200,
    tags: [ProductTag.Accessory],
  },
};

export type ProductState = ProductAsset & {
  type: ProductType;
  stackSize: number; // how many products remain in stack
  buyPrice: number; // TODO: this needs to be moved into playerState.buyPrice[productType] or something, the price for all products of a certain type is the same
  sellPrice: number;
};

export const init = (
  type: ProductType,
  newAsset?: ProductAsset
): ProductState => {
  const asset = newAsset ?? ProductAssets[type];
  if (!asset) throw new Error('Unknown product: ' + type);
  const product: ProductState = {
    type,
    ...asset,
    stackSize: asset.baseStackSize,
    buyPrice: asset.baseBuyPrice,
    sellPrice: asset.baseSellPrice,
  };
  return product;
};

const getStackSize = (product: ProductState, player: PlayerState): number => {
  return product.baseStackSize;
};
const getBuyPrice = (product: ProductState, player: PlayerState): number => {
  return product.baseBuyPrice;
};
const getSellPrice = (product: ProductState, player: PlayerState): number => {
  return product.baseSellPrice;
};

const update = (product: ProductState, player: PlayerState) => {
  product.stackSize = getStackSize(product, player);
  product.buyPrice = getBuyPrice(product, player);
  product.sellPrice = getSellPrice(product, player);
};

export const attach = (
  product: ProductState,
  machine: MachineId,
  player: PlayerState
) => {
  if (!player.unlockedProducts.get(product.type))
    throw new Error('Product is locked: ' + product.title);
  update(product, player);
  modifyMoney(-product.buyPrice, player);
  stockProduct(product, machine, player);
};

export const step = (
  product: ProductState,
  machine: MachineState,
  location: LocationState,
  player: PlayerState,
  deltaTime: number
) => {
  update(product, player);
};
