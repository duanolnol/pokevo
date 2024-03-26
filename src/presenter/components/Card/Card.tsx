import { ItemResult } from "@/interfaces/pokemon";
import React from "react";

interface CardProps {
  data: ItemResult;
  onSelect: (item: ItemResult) => void;
  isSelected: boolean;
}

const Card: React.FC<CardProps> = ({ data, onSelect, isSelected }) => (
  <button onClick={() => onSelect(data)} className="flex flex-col items-center">
    <div
      className={`border ${
        isSelected
          ? "border-yellow-500 border-4"
          : "bg-gradient-to-r from-yellow-100 to-yellow-200"
      } rounded-full p-0.5 mb-2`}
    >
      <div className="bg-slate-200 dark:bg-gray-900 rounded-full p-4 lg:p-8">
        <img
          alt={`${data.name}`}
          className="w-full h-auto"
          src={data.imageUrl.large}
        />
      </div>
    </div>
    <h2
      className={`text-sm lg:text-md font-medium ${
        isSelected ? "dark:text-yellow-500" : "dark:text-white"
      } capitalize text-ellipsis whitespace-nowrap`}
    >
      {data.name}
    </h2>
  </button>
);

export default Card;
