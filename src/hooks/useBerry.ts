import { getBerry } from "@/model/api/berry";
import { useQuery } from "@tanstack/react-query";

export const useBerry = (limit: number) => {
  return useQuery({ queryKey: ["berryList"], queryFn: () => getBerry(limit) });
};
