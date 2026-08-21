import type { ProductOrderData, ProductData } from '../product.js';

export const Products: ProductData[] = [
  {
    id: 'bg',
    title: 'Bubblegum',
    slotWidth: 1,
    slotHeight: 1,
    stackSize: 10,
    retailPrice: 1,
  },
  {
    id: 'sb',
    title: 'Superball',
    slotWidth: 2,
    slotHeight: 2,
    stackSize: 20,
    retailPrice: 2,
  },
];

export const ProductOrders: ProductOrderData[] = [
  {
    id: 'p-bg',
    title: 'Bubblegum crate',
    productId: 'bg',
    productStacks: 3,
    price: 8,
    duration: 5,
  },
  {
    id: 'p-sb',
    title: 'Superball box',
    productId: 'sb',
    productStacks: 4,
    price: 8,
    duration: 10,
  },
];
