import Search from "./presenter/components/Search";
import List from "./presenter/components/List";
import React from "react";
import { useSearch } from "./hooks/useSearch";
import { usePokemon } from "./hooks/usePokemon";
import { ItemResult } from "./interfaces/pokemon";
import ThemeSwitcher from "./presenter/components/ThemeSwitcher";
import ls from "localstorage-slim";
import { useNavigate } from "react-router";
import Layout from "./presenter/components/Layout";
import Button from "./presenter/components/Button";

const App = () => {
  const { search, handleSearch, handleClear } = useSearch();
  const observer = React.useRef<IntersectionObserver | null>(null);
  const [offset, setOffset] = React.useState(0);
  const limit = 10;
  const [currentData, setCurrentData] = React.useState<ItemResult[]>([]);
  const [selected, setSelected] = React.useState<ItemResult | null>(null);
  const navigate = useNavigate();

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

  React.useEffect(() => {
    const storedPokemon: ItemResult | null = ls.get("POKEMON_STORE", {
      decrypt: true,
    });
    if (storedPokemon) {
      navigate(`/${storedPokemon?.name}`);
    }
  }, [navigate, selected?.name]);

  const handleChoose = () => {
    ls.set("POKEMON_STORE", selected, { encrypt: true });
    navigate(`/${selected?.name}`);
  };
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
    <Layout>
      <div className="absolute z-50 w-full flex justify-center items-center">
        <div className="flex w-full justify-center items-center space-x-4 p-4 bg-transparent">
          <img className="w-20 lg:w-32 h-auto" src="/logo.png" alt="Logo" />
          <Search
            search={search}
            handleSearch={onHandleSearch}
            handleClear={onHandleClear}
          />
          <ThemeSwitcher />
        </div>
      </div>
      <div className="p-4 pt-24 lg:pt-32 pb-20">
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
          <Button
            title={selected ? "I choose you" : "Select your favorite Pokemon!"}
            ariaLabel="Choose Pokemon"
            handleClick={handleChoose}
            isDisabled={!selected}
          />
        </div>
      </div>
    </Layout>
  );
};

export default App;
