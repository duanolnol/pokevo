import { Berry } from "@/interfaces/berry";
import axios from "axios";

export const getBerry = async (limit: number) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/berry`, {
    params: {
      limit,
    },
  });
  const results = await Promise.all(
    data.results.map(async (berry: Berry) => {
      const berryId = berry.url.split("/")[6];
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/berry/${berryId}`
      );
      const itemId = data.item.url.split("/")[6];
      const itemRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/item/${itemId}`
      );

      return {
        ...berry,
        id: berryId,
        firmness: data.firmness.name,
        imageUrl: itemRes.data.sprites.default,
      };
    })
  );

  const newData = { ...data, results };
  return newData;
};
