import ProductsData from './products.json';
import SpritesData from './sprites.json';
import MachinesData from './machines.json';
import LocationsData from './locations.json';
import WarehousesData from './warehouses.json';
import SlotsData from './slots.json';

export const DataRegistry = Object.freeze({
  locations: LocationsData,
  machines: MachinesData,
  products: ProductsData,
  sprites: SpritesData,
  warehouses: WarehousesData,
  slots: SlotsData,
});

export type DataRegistry = typeof DataRegistry;
export type DataSource = keyof DataRegistry;
export type DataKey<Key extends DataSource> = keyof DataRegistry[Key] & string;

export function loadData<Source extends DataSource>(
  source: Source,
  id: DataKey<Source>
): DataRegistry[Source][DataKey<Source>] {
  const table = DataRegistry[source];
  if (!(id in table)) throw new Error(`Unknown ${source} id: ${id}`);
  return table[id];
}

export function allData<Source extends DataSource>(
  source: Source
): DataRegistry[Source] {
  if (!(source in DataRegistry))
    throw new Error(`Unknown data source: ${source}`);
  return DataRegistry[source];
}

export type ProductId = DataKey<'products'>;
export type SpriteId = DataKey<'sprites'>;
export type MachineId = DataKey<'machines'>;
export type LocationId = DataKey<'locations'>;
export type WarehouseId = DataKey<'warehouses'>;
export type SlotId = DataKey<'slots'>;
