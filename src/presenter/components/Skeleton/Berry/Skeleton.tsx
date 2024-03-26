import React from "react";

const Skeleton: React.FC = () => (
  <div className="flex w-full lg:w-3/4 overflow-x-scroll p-2 rounded-3xl border border-gray-300">
    {Array.from(Array(10).keys()).map((i) => (
      <div
        key={`skeleton-${i}`}
        className="flex-none mx-2 p-1 rounded-full animate-pulse bg-gray-300 w-12 h-12"
      />
    ))}
  </div>
);

export default Skeleton;
