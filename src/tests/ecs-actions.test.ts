import { World } from '@jakeklassen/ecs';
import { Action } from '../components/Action';
import { ActionSystem } from '../systems/ActionSystem';
import { spawnLocations } from '../factories/Location-factory';
import { spawnUnlockAction } from '../factories/Action-factory';
import { UnlockPrice } from '../components/UnlockPrice';
import { Locked } from '../components/Locked';
import { spawnPlayer } from '../factories/Player-factory';

describe('Actions', () => {
  it('should remove an action entity when action is completed', () => {
    const world = new World();
    const action = world.createEntity();
    world.addEntityComponents(action, new Action());
    world.addSystem(new ActionSystem());

    world.update(0);

    const actions = world.view(Action);
    expect(actions.length).toBe(0);
  });
});

describe('UnlockAction', () => {
  it('should unlock a location', () => {
    const world = new World();
    spawnPlayer(world);
    spawnLocations(world);

    const [[location, components]] = world.view(UnlockPrice, Locked);
    const price = components.get(UnlockPrice);
    const locked = components.get(Locked);
    expect(typeof price.value).toBe('number');
    expect(Boolean(locked)).toBe(true);

    world.addSystem(new ActionSystem());

    const action = spawnUnlockAction(world, location);
    world.update(0);

    const locked2 = components.get(Locked);
    expect(Boolean(locked2)).toBe(false);
  });
});
