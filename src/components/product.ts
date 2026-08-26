import { Component } from '@jakeklassen/ecs';

import Data from '../data/products.json';
import { type SpriteId } from './sprite.js';
import { Money } from './money.js';
import { Title } from './title.js';

type rawProductData = typeof Data;
export type ProductId = keyof rawProductData;

export type ProductData = {
  spriteId: SpriteId;
  salePrice: number;
  title: string;
};

const isProductData = (data: object): data is ProductData => {
  return 'spriteId' in data && 'salePrice' in data;
};

export class Product extends Component {
  #data: ProductData;
  public title: Title;
  public salePrice: Money;

  constructor(public id: ProductId) {
    if (!isProductData(Data[id])) throw Error(`Unknown product: ${id}`);
    super();
    this.#data = Data[id];
    this.title = new Title(this.#data.title);
    this.salePrice = new Money(this.#data.salePrice);
  }
}
