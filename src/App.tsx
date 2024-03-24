import Search from "./presenter/components/Search";
import List from "./presenter/components/List";
import React from "react";
import { useSearch } from "./hooks/useSearch";
import { usePokemon } from "./hooks/usePokemon";
import { ItemResult } from "./interfaces/pokemon";

const App = () => {
  const { search, handleSearch, handleClear } = useSearch();
  const observer = React.useRef<IntersectionObserver | null>(null);
  const [offset, setOffset] = React.useState(0);
  const limit = 10;
  const [currentData, setCurrentData] = React.useState<ItemResult[]>([]);
  const [selected, setSelected] = React.useState<ItemResult | null>(null);

  const { data, isLoading, isFetched } = usePokemon(search, limit, offset);

  React.useEffect(() => {
    if (isFetched) {
      if (search) {
        setCurrentData(data?.results || []);
      } else {
        setCurrentData((prev) => [...prev, ...(data?.results || [])]);
      }
    }
  }, [isFetched, data?.results, search]);

  const handleChoose = () => alert("Choose Pokemon");
  const loadMore = () => setOffset((prev) => prev + limit);
  const onHandleClear = () => {
    handleClear();
    setCurrentData([]);
    setOffset(0);
  };
  const onHandleSearch = (search: string) => {
    handleSearch(search);
    setOffset(0);
  };
  const handleSelect = (pokemon: ItemResult) => {
    setSelected(pokemon);
  };

  const lastElementRef = React.useCallback(
    (ref: HTMLDivElement) => {
      if (isLoading || search) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      });
      if (ref) {
        observer.current.observe(ref);
      }
    },
    [isLoading, search]
  );

  return (
    <main className="flex justify-center">
      <div className="w-full h-screen flex flex-col items-center dark:bg-gray-900 overflow-y-scroll">
        <div className="absolute w-full flex justify-center items-center">
          <div className="flex w-full justify-center items-center space-x-4 p-4 bg-transparent">
            <img className="w-24 lg:w-32 h-auto" src="/logo.png" alt="Logo" />
            <Search
              search={search}
              handleSearch={onHandleSearch}
              handleClear={onHandleClear}
            />
          </div>
        </div>
        <div className="p-4 pt-32 pb-20">
          <List
            isLoading={isLoading}
            lastElementRef={lastElementRef}
            results={currentData}
            handleSelect={handleSelect}
            selected={selected}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full lg:w-1/3 fixed border-0 rounded-t-xl lg:rounded-t-full bottom-0 h-20 flex justify-center items-center">
            <button
              className="w-full lg:w-3/5 bg-gradient-to-b from-yellow-500 to-yellow-700 disabled:bg-gradient-to-b disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed disabled:text-sm font-medium text-white rounded-full p-4 mx-4 shadow-[rgba(0,0,5,0.5)_2px_2px_4px_0px]"
              onClick={handleChoose}
              disabled={!selected}
              aria-label="I choose you"
            >
              {selected ? "I choose you" : "Select your favorite Pokemon!"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
