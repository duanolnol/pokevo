import React from "react";

const Skeleton: React.FC = () => (
  <div className="flex justify-center items-center p-4">
    <div className="w-full lg:w-3/4 h-48 animate-pulse bg-gray-300 rounded-2xl" />
  </div>
);

export default Skeleton;
