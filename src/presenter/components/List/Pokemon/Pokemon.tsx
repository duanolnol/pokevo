import React, { LegacyRef } from "react";
import Card from "../../Card";
import { ItemResult } from "@/interfaces/pokemon";

interface ListProps {
  results: ItemResult[];
  lastElementRef: LegacyRef<HTMLDivElement>;
  handleSelect: (pokemon: ItemResult) => void;
  selected: ItemResult | null;
}

const ListPokemon: React.FC<ListProps> = ({
  results,
  lastElementRef,
  handleSelect,
  selected,
}) => (
  <>
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
  </>
);

export default ListPokemon;
