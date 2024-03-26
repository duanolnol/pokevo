import React from "react";

interface ButtonProps {
  title: string;
  ariaLabel: string;
  handleClick: () => void;
  isDisabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  ariaLabel,
  handleClick,
  isDisabled,
}) => {
  return (
    <button
      className="w-full lg:w-3/5 bg-gradient-to-b from-yellow-500 to-yellow-700 disabled:bg-gradient-to-b disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed disabled:text-sm font-medium text-white rounded-full p-4 mx-4 shadow-[rgba(0,0,5,0.5)_2px_2px_4px_0px]"
      onClick={handleClick}
      disabled={!isDisabled}
      aria-label={ariaLabel}
    >
      {title}
    </button>
  );
};

export default Button;
