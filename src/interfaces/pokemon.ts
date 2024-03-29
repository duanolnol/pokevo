interface Name {
  name: string;
  url: string;
}

interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: Name;
}

interface Form extends Name {}

interface GameIndice {
  game_index: number;
  version: Name;
}

interface VersionDetail {
  rarity: number;
  version: Name;
}

interface HeldItem {
  item: Name;
  version_details: VersionDetail[];
}

interface VersionGroupDetail {
  level_learned_at: number;
  version_group: Name;
  move_learn_method: Name;
}

interface Move {
  move: Name;
  version_group_details: VersionGroupDetail[];
}

interface Stat {
  stat: Name;
  effort: number;
  base_stat: number;
}

interface Type {
  slot: number;
  type: Name;
}

interface otherSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: {
    dream_world: otherSprites;
    home: otherSprites;
    "official-artwork": otherSprites;
    showdown: otherSprites;
  };
  versions: {
    [key: string]: {
      [key: string]: otherSprites;
    };
  };
}

interface Stats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  weight: number;
}

export interface FormatData {
  name: string;
  url: string;
  id: string;
  imageUrl: {
    small: string;
    large: string;
    gif?: string;
  };
  stats?: Stats;
}

export interface ItemResult extends FormatData {}
export interface NextEvolution extends FormatData {}

export interface ListData {
  count: number;
  next: string;
  previous: string;
  results: ItemResult[];
}
export interface DetailData {
  id: string;
  name: string;
  stats: Stats;
  nextEvolution: NextEvolution;
  nextEvolutions: NextEvolution[];
}

interface Species extends Name {}

export interface Data {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndice[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  sprites: Sprites;
  species: Species;
  stats: Stat[];
  types: Type[];
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Name;
  version: Name;
}

interface Genus {
  genus: string;
  language: Name;
}

interface PokedexNumber {
  entry_number: number;
  pokedex: Name;
}

interface PalParkEncounter {
  area: Name;
  base_score: number;
  rate: number;
}

interface Variety {
  is_default: boolean;
  pokemon: Name;
}

export interface SpeciesData {
  base_happiness: number;
  capture_rate: number;
  color: Name;
  egg_groups: Name[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: Name | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: string[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Name;
  growth_rate: Name;
  habitat: Name;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: {
    language: Name;
    name: string;
  }[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Name;
  varieties: Variety[];
}

export interface StatsPokemon {
  HP: number;
  Attack: number;
  Defense: number;
  Speed: number;
  Weight: number;
}

