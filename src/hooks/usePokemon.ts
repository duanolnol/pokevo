import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from './../model/api/pokemonDetail';
import { getPokemon } from "../model/api/pokemon";

export const usePokemon = (search: string, limit: number, offset: number) => {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["pokemonList", search, limit, offset],
    queryFn: () => getPokemon(search, limit, offset),
  });

  return {
    data,
    isLoading,
    isFetched,
  };
};

export const usePokemonDetail = (id: string) => {
  return useQuery({
    queryKey: ["pokemonDetail", id],
    queryFn: () => getPokemonDetail(id),
  });
};
