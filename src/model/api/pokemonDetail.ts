import { Data, FormatData, SpeciesData } from "@/interfaces/pokemon";
import axios from "axios";

const getNewEvolution = (evolution: any): FormatData | null => {
  if (!evolution) {
    return null;
  }

  const id = evolution.species.url.split("/")[6];
  return {
    name: evolution.species.name,
    url: evolution.species.url,
    id: id,
    imageUrl: {
      small: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      large: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      gif: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
    },
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      weight: 0,
    },
  };
};

const getNextEvolution = async (
  name: string,
  evolution: any
): Promise<FormatData[] | null> => {
  let nextEvolution = evolution.chain;
  const nextEvolutions = [];
  while (nextEvolution && nextEvolution.species.name !== name) {
    if (nextEvolution.evolves_to.length > 0) {
      nextEvolution = nextEvolution.evolves_to[0];
    } else {
      return null;
    }
  }
  for (const evolution of nextEvolution.evolves_to) {
    const newNextEvolution = getNewEvolution(evolution);
    if (newNextEvolution) {
      const resNextEvolution = await axios.get(
        `${import.meta.env.VITE_API_URL}/pokemon/${newNextEvolution.id}`
      );
      const nextEvolutionData = resNextEvolution.data;
      newNextEvolution.stats = {
        hp: nextEvolutionData.stats[0].base_stat,
        attack: nextEvolutionData.stats[1].base_stat,
        defense: nextEvolutionData.stats[2].base_stat,
        speed: nextEvolutionData.stats[5].base_stat,
        weight: nextEvolutionData.weight,
      };
      nextEvolutions.push(newNextEvolution);
    }
  }
  return nextEvolutions;
};

export const getPokemonDetail = async (id: string) => {
  const resDetailData = await axios.get(
    `${import.meta.env.VITE_API_URL}/pokemon/${id}`
  );
  const detailData: Data = resDetailData.data;
  const resSpeciesData = await axios.get(detailData.species.url);
  const speciesData: SpeciesData = resSpeciesData.data;
  const resEvolutionChainData = await axios.get(
    speciesData.evolution_chain.url
  );
  const evolutionChainData = resEvolutionChainData.data;
  const nextEvolution = await getNextEvolution(
    detailData.name,
    evolutionChainData
  );
  const pokemonDetail = {
    id: detailData.id,
    name: detailData.name,
    imageUrl: {
      small: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailData.id}.png`,
      large: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailData.id}.png`,
      gif: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${detailData.id}.gif`,
    },

    stats: {
      hp: detailData.stats[0].base_stat,
      attack: detailData.stats[1].base_stat,
      defense: detailData.stats[2].base_stat,
      speed: detailData.stats[5].base_stat,
      weight: detailData.weight,
    },
    nextEvolution,
  };
  return pokemonDetail;
};
