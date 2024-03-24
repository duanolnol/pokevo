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

export interface FormatData {
  name: string;
  url: string;
  id: string;
  imageUrl: {
    small?: string;
    large?: string;
  };
}

export interface ItemResult extends FormatData {}

export interface ListData {
  count: number;
  next: string;
  previous: string;
  results: ItemResult[];
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
