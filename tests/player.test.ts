import { init } from '../src/player.js';

describe('Player', () => {
  it('initializes a new player state', () => {
    const result = init();
    expect(typeof result.money).toBe('number');
  });
});
