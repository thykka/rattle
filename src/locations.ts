import { MachineId, MachineState, step as stepMachine } from './machines.js';
import { PlayerState } from './player.js';

export enum LocationType {
  TestLocation,
  Home = 'home',
  SideStreet = 'street',
  CentralStation = 'station',
}

export type LocationAsset = {
  title: string;
  baseCompetition: number; // How many competing vendors are there
  baseRent: number; // How much player pays per day
  baseTraffic: number; // How often does someone walk by
  baseWealth: number; // How much buying power people have at this location
  baseMachines: number; // How many machines can be installed at this location
};

export const LocationAssets: Record<string, LocationAsset> = {
  [LocationType.Home]: {
    title: 'Driveway (Home)',
    baseCompetition: 0,
    baseRent: 0,
    baseMachines: 1,
    baseTraffic: 1,
    baseWealth: 5,
  },
  [LocationType.SideStreet]: {
    title: 'Side Street 1',
    baseCompetition: 1,
    baseRent: 5,
    baseMachines: 2,
    baseTraffic: 2,
    baseWealth: 5,
  },
  [LocationType.CentralStation]: {
    title: 'central-railway-station',
    baseCompetition: 12,
    baseRent: 2000,
    baseMachines: 16,
    baseTraffic: 400,
    baseWealth: 25,
  },
};

export type LocationState = LocationAsset & {
  type: LocationType; // asset's key
  competition: number;
  rent: number;
  traffic: number;
  wealth: number;
  machines: MachineId[]; // ids of installed machines
};

const getCompetition = (
  location: LocationState,
  player: PlayerState
): number => {
  return location.baseCompetition;
};
const getRent = (location: LocationState, player: PlayerState): number => {
  return location.baseRent;
};
const getTraffic = (location: LocationState, player: PlayerState): number => {
  return location.baseTraffic;
};
const getWealth = (location: LocationState, player: PlayerState): number => {
  return location.baseWealth;
};

export const init = (
  type: LocationType,
  newLocation?: LocationAsset
): LocationState => {
  const asset = newLocation ?? LocationAssets[type];
  if (!asset) throw new Error('Unknown Location: ' + type);
  const location: LocationState = {
    type,
    ...asset,
    competition: asset.baseCompetition,
    rent: asset.baseRent,
    traffic: asset.baseTraffic,
    wealth: asset.baseWealth,
    machines: [],
  };
  return location;
};

const update = (location: LocationState, player: PlayerState) => {
  location.competition = getCompetition(location, player);
  location.rent = getRent(location, player);
  location.traffic = getTraffic(location, player);
  location.wealth = getWealth(location, player);
};

export const attach = (location: LocationState, player: PlayerState) => {
  if (player.locations[location.type])
    throw new Error('Already have location: ' + location.type);

  update(location, player);
  player.locations[location.type] = location;
};

export const step = (
  location: LocationState,
  player: PlayerState,
  deltaTime: number
): void => {
  update(location, player);
  location.machines
    .map((id): MachineState => player.machines[id])
    .forEach((machine) => stepMachine(machine, location, player, deltaTime));
};
