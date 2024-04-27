import React from "react";

type SearchProps = {
  handleSearch: (search: string) => void;
  handleClear: () => void;
};

const Search: React.FC<SearchProps> = ({
  handleSearch,
  handleClear,
}) => {

  const [keyword, setKeyword] = React.useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(keyword);
    }
  };

  const onHandleClear = () => {
    setKeyword('');
    handleClear();
  };


  return (
    <div className="relative w-full lg:w-2/5">
      <input
        role="textbox"
        alt="Search Pokemon"
        type="text"
        value={keyword}
        placeholder="Search Pokemon"
        className="w-full border border-gray-400 shadow-[rgba(0,0,0,0.5)_2px_2px_4px_0px] rounded-full lg:p-4 lg:pr-12 px-4 py-3 pr-10 focus:outline-none focus:border-green-600"
        onChange={(event) => setKeyword(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {keyword && (
        <button
          className="absolute mt-0 mr-0 top-4 right-4 lg:right-6 lg:top-5"
          onClick={onHandleClear}
          role="button"
          aria-label="close"
        >
          <img src="/close.svg" alt="close" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Search;
