import { PlayerState } from './player.js';

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
  stackSize: number; // how many products remain in stack
  buyPrice: number;
  sellPrice: number;
};

export const init = (
  type: ProductType,
  newAsset?: ProductAsset
): ProductState => {
  const asset = newAsset ?? ProductAssets[type];
  if (!asset) throw new Error('Unknown product: ' + type);
  const product: ProductState = {
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

export const attach = (product: ProductState, player: PlayerState) => {
  product.stackSize = getStackSize(product, player);
  product.buyPrice = getBuyPrice(product, player);
  product.sellPrice = getSellPrice(product, player);
};
