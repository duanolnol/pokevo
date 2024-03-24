import React, { LegacyRef } from "react";
import Card from "../Card";
import { ItemResult } from "@/interfaces/pokemon";
import Skeleton from "../Skeleton";

interface ListProps {
  isLoading: boolean;
  results: ItemResult[];
  lastElementRef: LegacyRef<HTMLDivElement>;
  handleSelect: (pokemon: ItemResult) => void;
  selected: ItemResult | null;
}

const skeletons = () =>
  [...Array(10).keys()].map((_, index) => {
    return <Skeleton key={`skeleton-${index}`} />;
  });

const List: React.FC<ListProps> = ({
  isLoading,
  results,
  lastElementRef,
  handleSelect,
  selected,
}) => (
  <div className="grid grid-cols-3 gap-4">
    {results?.map((data, index) => (
      <div
        key={data.id}
        className="flex justify-center mb-8 lg:mx-8"
        ref={results.length === index + 1 ? lastElementRef : null}
      >
        <Card
          data={data}
          onSelect={handleSelect}
          isSelected={data.id === selected?.id}
        />
      </div>
    ))}

    {isLoading && skeletons()}
  </div>
);

export default List;
