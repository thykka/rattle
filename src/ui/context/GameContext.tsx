import { createContext, useContext } from 'react';
import { World } from '@jakeklassen/ecs';

export const GameContext = createContext<World | null>(null);
export function useGame() {
  const game = useContext(GameContext);
  if (!game) throw new Error('useGame must be used inside <GameProvider>');
  return game;
}
