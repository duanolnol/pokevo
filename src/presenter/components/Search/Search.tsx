import React from "react";

type SearchProps = {
  search: string;
  handleSearch: (search: string) => void;
  handleClear: () => void;
};

const Search: React.FC<SearchProps> = ({
  search,
  handleSearch,
  handleClear,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && search) {
      handleSearch(search);
    }
  };

  return (
    <div className="relative w-full lg:w-1/2">
      <input
        role="textbox"
        alt="Search Pokemon"
        type="text"
        value={search}
        placeholder="Search Pokemon"
        className="w-full border border-gray-400 shadow-[rgba(0,0,0,0.5)_2px_2px_4px_0px] rounded-full p-4 pr-12 focus:outline-none focus:border-green-600"
        onChange={(event) => handleSearch(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {search && (
        <button
          className="absolute mt-0 mr-0 right-6 top-5"
          onClick={handleClear}
          role="button"
        >
          <img src="/close.svg" alt="close" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Search;
