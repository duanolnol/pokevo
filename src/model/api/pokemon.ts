import { Data, ListData } from "@/interfaces/pokemon";
import axios from "axios";

export const getPokemon = async (
  search: string,
  limit: number,
  offset: number
) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/pokemon/${search}`,
    {
      params: {
        limit: !search ? limit : undefined,
        offset: !search ? offset : undefined,
      },
    }
  );

  if (search) {
    const currentData: Data = data;
    const newCurrentData: ListData = {
      count: 1,
      next: "",
      previous: "",
      results: [
        {
          name: currentData.name,
          url: `${import.meta.env.VITE_API_URL}/pokemon/${currentData.id}`,
          id: `${currentData.id}`,
          imageUrl: {
            small: currentData.sprites.front_default,
            large: currentData.sprites.other["official-artwork"].front_default,
          },
        },
      ],
    };
    return newCurrentData;
  } else {
    const currentListData: ListData = data;
    const results = await Promise.all(
      currentListData.results.map(async (pokemon) => {
        const id = pokemon.url.split("/")[6];
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/pokemon/${id}`
        );
        return {
          ...pokemon,
          id: id,
          imageUrl: {
            small: data.sprites.front_default,
            large: data.sprites.other["official-artwork"].front_default,
          },
        };
      })
    );

    const newCurrentListData = {
      ...currentListData,
      results,
    };

    return newCurrentListData;
  }
};
