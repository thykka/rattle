import { System, type World } from '@jakeklassen/ecs';
import { Timer } from '../components/timer.js';

export class TimerSystem extends System {
  constructor() {
    super();
  }
  public update(world: World, dt: number): void {
    for (const [entity, components] of world.view(Timer)) {
      const timer = components.get(Timer);
      if (timer.completed) return;
      timer.delta += dt;
      if (timer.delta >= timer.tickRate) {
        timer.currentTime += timer.delta;
        timer.delta = 0;

        timer.progress = (timer.currentTime - timer.startTime) / timer.duration;

        if (timer.progress >= 1) {
          timer.completed = true;
          timer.progress = 1;
        }
      }
    }
  }
}
