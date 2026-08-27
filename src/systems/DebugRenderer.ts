import { System, type World } from '@jakeklassen/ecs';
import { Price } from '../components/Price.js';
import { MachineDataId, ProductDataId } from '../components/DataId.js';
import { Amount } from '../components/Amount.js';
import { Sprite } from '../components/Sprite.js';
import { Shape } from '../components/Shape.js';
import { Money } from '../components/Money.js';
import { Size } from '../components/Size.js';
import { Contents } from '../components/Contents.js';
import { Name } from '../components/Name.js';
import { Children } from '../components/Children.js';

const currency = (v: number) => v.toFixed(2) + '€';
const percent = (v: number) => (100 * v).toFixed(2) + '%';

const keyValue = (
  component,
  key: string = 'value',
  format?: (unknown) => string
) => {
  return [key, format ? format(component[key]) : (component[key] ?? '??')].join(
    ': '
  );
};

export class DebugRenderer extends System {
  constructor(private readonly context: HTMLElement) {
    super();
  }

  public update(world: World) {
    const output = ['Player'];
    for (const [entity, components] of world.view(Money, Name)) {
      const rows = [];
      rows.push(
        ['name', components.get(Name).text].join(': '),
        ['money', currency(components.get(Money).value)].join(': ')
      );
      output.push(entity + ' ' + rows.join('\n  ') + '\n');
    }
    output.push('Products');
    for (const [entity, components] of world.view(ProductDataId)) {
      const rows = [];
      const sprite = components.get(Sprite);
      rows.push(
        keyValue(components.get(ProductDataId), 'id'),
        keyValue(components.get(Amount)),
        keyValue(components.get(Price), 'value', currency),
        keyValue(components.get(Shape), 'id'),
        ['sprite', [sprite.sx, sprite.sy, sprite.sw, sprite.sh].join(',')].join(
          ': '
        )
      );
      output.push(entity + ' ' + rows.join('\n  ') + '\n');
    }
    output.push('Machines');
    for (const [machineEntity, components] of world.view(MachineDataId)) {
      const rows = [];
      rows.push(
        keyValue(components.get(MachineDataId), 'id'),
        keyValue(components.get(Money), 'value', currency),
        'Slots:'
      );
      const children = components.get(Children).entities;
      for (const slotEntity of children) {
        const slotComponents = world.getEntityComponents(slotEntity);
        const slotRow = [];
        const size = slotComponents.get(Size);
        slotRow.push(
          `shape: ${slotComponents.get(Shape).id}`,
          `size: ${size.w}x${size.h}`,
          `item: ${slotComponents.get(Contents).item}`
        );
        rows.push(slotEntity + ' ' + slotRow.join('\n    ') + '\n');
      }
      /*
      for (const [slotEntity, slotComponents] of world.view(
        SlotDataId,
        Parent
        )) {
        const slotRow = [];
        const parent = slotComponents.get(Parent);
        if (parent.entity !== machineEntity) continue;
        const size = slotComponents.get(Size);
        const shape = slotComponents.get(Shape);
        const contents = slotComponents.get(Contents);
        slotRow.push(
          `shape: ${shape.id}`,
          `size: ${size.h}x${size.w}`,
          keyValue(contents, 'item')
        );
        rows.push(slotEntity + ' ' + slotRow.join('\n    ') + '\n');
      }
      */
      output.push(machineEntity + ' ' + rows.join('\n  ') + '\n');
    }
    this.context.innerText = output.join('\n');
  }
}
