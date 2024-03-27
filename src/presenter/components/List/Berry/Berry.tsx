import { BerryItemResult } from "@/interfaces/berry";
import React from "react";
import SkeletonBerry from "../../Skeleton/Berry";

interface BerryProps {
  berries: BerryItemResult[];
  setSelected: (berry: BerryItemResult) => void;
  isLoading: boolean;
  selected: BerryItemResult | null;
}

const ListBerry: React.FC<BerryProps> = ({
  berries,
  setSelected,
  isLoading,
  selected,
}) => {
  if (isLoading) {
    return <SkeletonBerry />;
  }

  if (berries?.length > 0) {
    return (
      <div className="flex w-full lg:w-3/4 overflow-x-scroll p-4 rounded-3xl border border-gray-400 bg-gray-200">
        {berries.map((berry) => (
          <button
            className={`flex-none rounded-2xl mx-2 ${
              selected?.id === berry.id ? "bg-yellow-300" : ""
            }`}
            key={berry.id}
            onClick={() => setSelected(berry)}
          >
            <img
              alt={berry.name}
              className="w-full h-auto"
              src={berry.imageUrl}
            />
          </button>
        ))}
      </div>
    );
  } else {
    return <div>No berries available</div>;
  }
};

export default ListBerry;
