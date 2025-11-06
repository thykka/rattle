import { PlayerState, step as playerStep } from './player.js';

const FPS = 0.1;

type Loop = {
  step: (number) => void;
  start: () => void;
  pause: () => void;
};

export const init = (
  player: PlayerState,
  draw: (player: PlayerState) => void
): Loop => {
  let lastTime;
  let intervalId;

  const loop = {
    step: (currentTime): void => {
      intervalId = setTimeout(() => {
        loop.step(performance.now());
      }, 1000 / FPS);

      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      playerStep(player, deltaTime);
      draw(player);
    },
    start: (): void => {
      if (!intervalId) loop.step(performance.now());
    },
    pause: (): void => {
      if (intervalId) intervalId = clearTimeout(intervalId);
    },
  };
  return loop;
};
