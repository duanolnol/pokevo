export interface List {
  count: number;
  next: string | null;
  previous: string | null;
  results: BerryItemResult[];
}

export type Firmness =
  | "very-soft"
  | "soft"
  | "hard"
  | "very-hard"
  | "super-hard";

export interface BerryItemResult {
  name: string;
  url: string;
  id: string;
  firmness: Firmness;
  imageUrl: string;
  weight?: number;
}

export interface Berry {
  name: string;
  url: string;
}

interface FlavorMap {
  potency: number;
  flavor: Flavor;
}

interface Flavor {
  name: string;
  url: string;
}

interface Item {
  name: string;
  url: string;
}

interface NaturalGiftType {
  name: string;
  url: string;
}

export interface Data {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: Berry;
  flavors: FlavorMap[];
  item: Item;
  natural_gift_type: NaturalGiftType;
}

export interface ItemAPIResponse {
  id: number;
  name: string;
  cost: number;
  fling_power: number;
  fling_effect: any;
  attributes: any[];
  category: any;
  effect_entries: any[];
  flavor_text_entries: any[];
  game_indices: any[];
  names: any[];
  sprites: {
    default: string;
  };
  held_by_pokemon: any[];
  baby_trigger_for: any;
}

