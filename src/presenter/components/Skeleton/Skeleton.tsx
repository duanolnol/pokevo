import React from "react";

const Skeleton: React.FC = () => (
  <div className="flex justify-center">
    <div className="w-24 h-24 lg:w-80 lg:h-80 mx-8 bg-gray-200 rounded-full animate-pulse" />
  </div>
);

export default Skeleton;
