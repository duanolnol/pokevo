import React from "react";
import { Data } from "../List/List";

interface CardProps {
  data: Data;
}

const Card: React.FC<CardProps> = ({ data }) => (
  <button onClick={() => alert("Select Pokemon")} className="flex flex-col items-center">
    <div
      className="border border-grey-100 rounded-full p-4 mb-2"
    >
      <img
        alt={`${data.name}`}
        className="w-full h-auto"
        src={data.imageUrl.large}
      />
    </div>
    <h2 className="font-sm font-medium capitalize text-ellipsis whitespace-nowrap">
      {data.name}
    </h2>
  </button>
);

export default Card;
