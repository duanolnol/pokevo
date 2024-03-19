import React from "react";
import { Data } from "../List";

interface CardProps {
  data: Data;
}

const Card: React.FC<CardProps> = ({ data }) => (
  <div
    className="overflow-hidden border border-green-500 rounded-full p-4"
    onClick={() => alert("Select Pokemon")}
  >
    <img
      alt={`${data.name}`}
      className="w-full h-auto"
      src={data.imageUrl.large}
    />
    <h2 className="text-center text-sm font-medium capitalize text-ellipsis whitespace-nowrap">
      {data.name}
    </h2>
  </div>
);

export default Card;
