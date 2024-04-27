import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from './../model/api/pokemonDetail';
import { getPokemon } from "../model/api/pokemon";

export const usePokemon = (search: string, limit: number, offset: number) => {
  const { data, isLoading, isFetched, error } = useQuery({
    queryKey: ["pokemonList", search, limit, offset],
    queryFn: () => getPokemon(search, limit, offset),
  });

  return {
    data,
    isLoading,
    isFetched,
    error
  };
};

export const usePokemonDetail = (id: string) => {
  return useQuery({
    queryKey: ["pokemonDetail", id],
    queryFn: () => getPokemonDetail(id),
  });
};
