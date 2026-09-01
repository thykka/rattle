import { World } from '@jakeklassen/ecs';
import { spawnPlayer } from './factories/Player-factory.js';

export const game = new World();
export const player = spawnPlayer(game);

export type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeToGame(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

let lastTick = performance.now();
let rafId: number;

function tick() {
  const now = performance.now();
  const dt = now - lastTick;
  lastTick = now;
  game.update(dt);
  listeners.forEach((listener) => listener());

  rafId = requestAnimationFrame(tick);
}

export function startLoop() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(tick);
}
export function stopLoop() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}
