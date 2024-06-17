import type { ProductAsset } from '../src/products.js';
import { ProductType, init } from '../src/products.js';

const minimalProduct: ProductAsset = {
  title: 'Minimal Product',
  baseBuyPrice: 0,
  baseSellPrice: 0,
  baseStackSize: 0,
  tags: [],
};

describe('Products', () => {
  it('initializes a new product state', () => {
    const result = init(ProductType.TestProduct, minimalProduct);
    expect(Array.isArray(result.tags)).toBe(true);
  });
});
