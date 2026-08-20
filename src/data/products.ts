import type { ProductData } from '../product.js';

export const Products: ProductData[] = [
  {
    id: 'bg',
    title: 'Bubblegum',
    slotWidth: 1,
    slotHeight: 1,
    stackSize: 20,
    orderPrice: 10,
    retailPrice: 1,
    orderDuration: 5,
  },
  {
    id: 'sb',
    title: 'Superball',
    slotWidth: 1,
    slotHeight: 1,
    stackSize: 10,
    orderPrice: 5,
    retailPrice: 2,
    orderDuration: 10,
  },
];
