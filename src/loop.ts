import { PlayerState, step as playerStep } from './player.js';

const FPS = 0.3;

export const init = (
  player: PlayerState,
  draw: (player: PlayerState) => void
) => {
  let lastTime;
  let intervalId;

  const loop = {
    step: (currentTime) => {
      intervalId = setTimeout(() => {
        loop.step(performance.now());
      }, 1000 / FPS);

      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      playerStep(player, deltaTime);
      draw(player);
    },
    start: () => {
      if (!intervalId) loop.step(performance.now());
    },
    pause: () => {
      if (intervalId) intervalId = clearTimeout(intervalId);
    },
  };
  return loop;
};
