import { Order } from './order.js';
import { World } from './world.js';

export class DebugView {
  world: World;
  element: HTMLOutputElement;

  constructor(world: World) {
    this.world = world;
    this.element = document.createElement('output');
    this.element.style.fontFamily = 'monospace';
    this.element.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(this.element);
  }

  draw() {
    const out = [`Money: €${this.world.money.toFixed(2)}`];
    out.push('Locations:');
    this.world.locations.forEach((l) => {
      out.push(`- ${l.data.title}`);
      out.push('  Machines:');
      l.machines.forEach((m) => {
        out.push(`  - ${m.data.title} (Change: €${m.money})`);
        out.push('    Slots:');
        m.slots.forEach((s) => {
          out.push(
            `    - ${s.data.title}: ${s.product ? `${s.product.data.title} x${s.product.stackAmount}` : '(empty)'} / ${s.data.stackLimit}`
          );
        });
      });
    });
    out.push('Warehouses:');
    this.world.warehouses.forEach((w) => {
      out.push(`- ${w.data.title}`);
      out.push(`  Products (${w.products.length} / ${w.data.productLimit}):`);
      w.products.forEach((p, pi) => {
        out.push(
          `  - ${p.data.title} x${p.stackAmount} / ${w.data.stackLimit}`
        );
      });
      out.push(`  Machines (${w.machines.length} / ${w.data.machineLimit}):`);
      w.machines.forEach((m) => {
        out.push(`  - ${m.data.title}`);
      });
      out.push('  Orders:');
      w.orders.forEach((o) => {
        let orderRow = `  - `;
        if (Order.isProductOrder(o)) {
          orderRow += `Product: ${o.product.data.title} x${o.product.stackAmount ?? 1}`;
        } else if (Order.isMachineOrder(o)) {
          orderRow += `Machine: ${o.machine.data.title}`;
        } else {
          orderRow += 'Unknown order';
        }
        orderRow += ' [ ';
        if (o.orderedAt) {
          const elapsed = this.world.currentTime - o.orderedAt;
          const progress = elapsed / o.data.duration;
          orderRow += `${(progress * 100).toFixed(2)}%`;
        } else {
          orderRow += 'pending';
        }
        orderRow += ' ]';
        out.push(orderRow);
      });
    });
    this.element.innerText = out.join('\n');
    requestAnimationFrame(() => this.draw());
  }
}
