import React from "react";

const Skeleton: React.FC = () => (
  <div
    className="border border-gray-200 rounded-lg overflow-hidden animate-pulse p-2"
    data-testid="skeleton"
  >
    <div className="w-full h-24 bg-gray-300" />
    <div className="w-3/4 mx-auto h-6 bg-gray-300 rounded mt-2" />
  </div>
);

export default Skeleton;
