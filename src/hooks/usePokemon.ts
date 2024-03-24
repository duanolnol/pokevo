import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../model/api/pokemon";

export const usePokemon = (search: string, limit: number, offset: number) => {
  const { data, isLoading, error, isFetched } = useQuery({
    queryKey: ["pokemonList", search, limit, offset],
    queryFn: () => getPokemon(search, limit, offset),
  });
  
  return {
    data,
    isLoading,
    error,
    isFetched
  }
};
