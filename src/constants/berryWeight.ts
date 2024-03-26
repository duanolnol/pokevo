import { Firmness } from "@/interfaces/berry";

const firmness: { [key in Firmness | "others"]: number } = {
  "very-soft": 2,
  soft: 3,
  hard: 5,
  "very-hard": 8,
  "super-hard": 10,
  others: 0,
};

export { firmness };
