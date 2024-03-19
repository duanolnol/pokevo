import React from "react";
import Card from "../Card";

export interface Data {
  name: string;
  url: string;
  id: string;
  imageUrl: {
    small: string;
    large: string;
  };
}

interface ListProps {
  datas: Data[];
}

const List: React.FC<ListProps> = ({ datas }) => (
  <div className="grid lg:grid-cols-4 grid-cols-3 gap-4">
    {datas.map((data) => (
      <div key={data.id}>
        <Card data={data} />
      </div>
    ))}
  </div>
);

export default List;
