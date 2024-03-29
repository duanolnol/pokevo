import React from "react";

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  return (
    <progress
      className={`[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg ${
        percent > 50
          ? "[&::-webkit-progress-value]:bg-green-600 [&::-moz-progress-bar]:bg-green-600"
          : "[&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500"
      } [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500`}
      value={percent}
      max={100}
    />
  );
};

export default ProgressBar;
