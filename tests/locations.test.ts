import type { LocationAsset } from '../src/locations.js';
import { init, LocationType } from '../src/locations.js';

const minimalLocation: LocationAsset = {
  title: 'Minimal Test Location',
  baseCompetition: 0,
  baseRent: 0,
  baseMachines: 1,
  baseTraffic: 1,
  baseWealth: 1,
};

describe('Locations', () => {
  it('initializes a new location state', () => {
    const result = init(LocationType.TestLocation, minimalLocation);
    expect(result.type).toBe(LocationType.TestLocation);
    expect(Array.isArray(result.machines)).toBe(true);
  });
});
