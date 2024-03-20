import React from "react";

interface SearchProps {
  search: string;
  onSearch: (text: string) => void;
  onClear: () => void;
}

const Search: React.FC<SearchProps> = ({ search, onSearch, onClear }) => {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(search);
    }
  };

  return (
    <div className="relative w-full md:w-2/3 lg:w-1/3">
      <input
        role="textbox"
        type="text"
        value={search}
        placeholder="Search Pokemon"
        className="w-full border border-gray-400 rounded-full p-4 focus:outline-none focus:border-green-600"
        onChange={(event) => onSearch(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {search && (
        <button
          className="absolute mt-0 mr-0 right-6 top-5"
          onClick={onClear}
          role="button"
        >
          <img src="/close.svg" alt="close" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Search;
