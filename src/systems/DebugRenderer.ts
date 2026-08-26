import { System, type World } from '@jakeklassen/ecs';
import { Money } from '../components/money.js';
import { Title } from '../components/title.js';
import { Timer } from '../components/timer.js';
import { Product } from '../components/product.js';
import { Position } from '../components/position.js';

const currency = (v: number) => v.toFixed(2) + '€';
const percent = (v: number) => (100 * v).toFixed(2) + '%';

export class DebugRenderer extends System {
  constructor(private readonly context: HTMLElement) {
    super();
  }

  public update(world: World) {
    const output = [];
    for (const [entity, components] of world.view(Money, Title, Timer)) {
      const rows = [];
      rows.push(components.get(Title).text);
      rows.push(currency(components.get(Money).amount));
      rows.push(percent(components.get(Timer).progress));
      output.push(entity, '  ' + rows.join('\n  '));
    }
    for (const [entity, components] of world.view(Product)) {
      const rows = [];
      const product = components.get(Product);
      rows.push(`${product.id}: ${currency(product.salePrice.amount)}`);
      output.push(entity, '  ' + rows.join('\n  '));
    }
    for (const [entity, components] of world.view(Position)) {
      const rows = [];
      const position = components.get(Position);
      rows.push(`x${position.x} y${position.y}`);
      output.push(entity, '  ' + rows.join('\n  '));
    }
    this.context.innerText = output.join('\n');
  }
}
