import ThemeSwitcher from "@/presenter/components/ThemeSwitcher";
import React from "react";
import ls from "localstorage-slim";
import { useNavigate } from "react-router";
import { ItemResult, NextEvolution, StatsPokemon } from "@/interfaces/pokemon";
import Layout from "@/presenter/components/Layout";
import { usePokemonDetail } from "@/hooks/usePokemon";
import Button from "@/presenter/components/Button";
import { useBerry } from "@/hooks/useBerry";
import { firmness } from "@/constants/berryWeight";
import { BerryItemResult } from "@/interfaces/berry";
import ListBerry from "@/presenter/components/List/Berry";
import SkeletonPokemonDetail from "@/presenter/components/Skeleton/PokemonDetail";

const Pokemon: React.FC = () => {
  const navigate = useNavigate();
  const currentData: ItemResult | null = ls.get("POKEMON_STORE", {
    decrypt: true,
  });
  const [nextEvolutions, setNextEvolutions] = React.useState<
    NextEvolution[] | null
  >([]);
  const [pokemon, setPokemon] = React.useState<ItemResult | null>(currentData);
  const { data: pokemonDetail, isLoading: isLoadingPokemon } = usePokemonDetail(
    pokemon?.id || ""
  );
  const [stats, setStats] = React.useState<StatsPokemon>({
    HP: 0,
    Attack: 0,
    Defense: 0,
    Speed: 0,
    Weight: 0,
  });
  const [feed, setFeed] = React.useState<BerryItemResult[]>([]);
  const [weight, setWeight] = React.useState<number[]>([]);
  const { data: berryList, isLoading: isLoadingBerry } = useBerry(100);
  const berries: BerryItemResult[] = berryList?.results;
  const [selected, setSelected] = React.useState<BerryItemResult | null>(null);

  const onRelease = () => {
    ls.remove("POKEMON_STORE");
    navigate("/");
  };

  const handleEvolution = () => {
    ls.set("POKEMON_STORE", nextEvolutions && nextEvolutions[0], {
      encrypt: true,
    });
    setPokemon(nextEvolutions && nextEvolutions[0]);
    setWeight([stats.Weight]);
    setFeed([]);
    setSelected(null);
  };

  React.useEffect(() => {
    if (!pokemon) {
      navigate("/");
    }
  }, [navigate, pokemon]);

  React.useEffect(() => {
    if (pokemonDetail && pokemonDetail.nextEvolution) {
      setNextEvolutions(pokemonDetail.nextEvolution);
    }
  }, [pokemonDetail]);

  React.useEffect(() => {
    if (pokemonDetail) {
      setStats({
        HP: pokemonDetail?.stats.hp,
        Attack: pokemonDetail?.stats.attack,
        Defense: pokemonDetail?.stats.defense,
        Speed: pokemonDetail?.stats.speed,
        Weight: pokemonDetail?.stats.weight,
      });
      setWeight([pokemonDetail?.stats.weight]);
    }
  }, [pokemonDetail]);

  const feedPokemon = () => {
    const lastBerry = feed[feed.length - 1];
    if (selected) {
      let newWeight = 0;
      if (lastBerry?.firmness === selected.firmness) {
        const updateWeight = stats.Weight - firmness[selected.firmness] * 2;
        newWeight = updateWeight < 0 ? 1 : updateWeight;
      } else {
        newWeight = stats.Weight + firmness[selected.firmness];
      }
      setFeed([
        ...feed,
        {
          ...selected,
          weight: firmness[selected.firmness],
        },
      ]);
      setStats({
        ...stats,
        Weight: newWeight,
      });
      setWeight([...weight, newWeight]);
    }
  };

  return (
    <Layout>
      <header className="absolute z-50 w-full flex justify-center items-center px-3 lg:px-8">
        <img className="w-20 lg:w-32 h-auto" src="/logo.png" alt="Logo" />
        <div className="flex w-full justify-center items-center space-x-6 p-4 bg-transparent">
          <div className="text-black dark:text-white font-bold text-2xl lg:text-3xl capitalize">
            {pokemon?.name}
          </div>
          <ThemeSwitcher />
        </div>
        <button onClick={onRelease}>
          <img src="/remove.svg" alt="remove" className="w-10 lg:w-8 h-auto" />
        </button>
      </header>
      <section className="w-full lg:w-1/2 p-4 py-20">
        {isLoadingPokemon ? (
          <SkeletonPokemonDetail />
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex w-full lg:w-fit justify-center items-center mt-4 border-4 rounded-2xl border-yellow-500 space-x-4 p-4 mx-4">
              <div className="flex justify-center items-center">
                <div className="w-28 h-28 lg:w-40 lg:h-40">
                  <img
                    alt={`${pokemon?.name}`}
                    className="w-full h-auto"
                    src={pokemon?.imageUrl.large}
                  />
                </div>
              </div>
              <div className="w-full lg:w-40">
                {Object.entries(stats).map(([key, value]) => (
                  <div className="flex justify-between items-center" key={key}>
                    <div
                      className={`dark:text-white text-gray-900 text-md font-medium ${
                        key === "Weight" && "flex justify-center gap-1"
                      }`}
                    >
                      {key}
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        key === "Weight"
                          ? "text-orange-500 text-3xl"
                          : "text-yellow-500"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!isLoadingPokemon &&
        nextEvolutions &&
        nextEvolutions.length > 0 &&
        nextEvolutions[0].stats &&
        nextEvolutions[0].stats.weight - stats.Weight > 0 ? (
          <div className="flex flex-col justify-center items-center">
            <div className="mt-2">
              <div className="flex justify-center items-center space-x-2">
                <p className="text-gray-500 text-lg">Next Evolution</p>
                <p className="text-3xl font-bold text-yellow-500 capitalize">
                  {nextEvolutions[0]?.name}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <p className="text-gray-500 text-lg">Weight</p>
                <p className="text-3xl font-bold text-orange-500">
                  {nextEvolutions[0]?.stats.weight}
                </p>
              </div>
            </div>
          </div>
        ) : nextEvolutions &&
          nextEvolutions.length > 0 &&
          nextEvolutions[0].stats &&
          nextEvolutions[0].stats.weight - stats.Weight <= 0 ? (
          <div className="flex mt-2 flex-col justify-center items-center">
            <button
              className="px-3 py-2 rounded-full bg-orange-500 text-white mt-2 font-bold w-1/3"
              onClick={handleEvolution}
            >
              Evolution
            </button>
          </div>
        ) : null}
        <div className="flex flex-col justify-center items-center mt-5 px-4 ">
          <div className="flex w-fit justify-center items-center text-center gap-4 mb-4 border-4 rounded-2xl border-yellow-500 p-4">
            <div>
              <p className="text-gray-500 text-sm">Berries</p>
              <p className="text-lg font-bold capitalize dark:text-white text-gray-500">
                {selected?.name || "0"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Firmness</p>
              <p className="text-lg font-bold capitalize dark:text-white text-gray-500">
                {selected?.firmness.replace("-", " ") || "0"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Weight</p>
              <p
                className={`text-lg font-bold capitalize dark:text-white ${
                  selected && "text-orange-500"
                }`}
              >
                {selected
                  ? `+${firmness[selected?.firmness || "others"]}`
                  : "0"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ListBerry
            berries={berries}
            isLoading={isLoadingBerry}
            selected={selected}
            setSelected={(item) => setSelected(item)}
          />
        </div>
      </section>
      <footer className="flex justify-center items-center">
        <div className="w-full lg:w-1/3 fixed border-0 rounded-t-xl lg:rounded-t-full bottom-0 h-20 flex justify-center items-center">
          <Button
            title={
              selected
                ? "Feed Pokemon"
                : nextEvolutions?.length === 0
                ? "No more evolution ..."
                : "Select Berry for feeding ..."
            }
            ariaLabel="Feed Pokemon"
            handleClick={feedPokemon}
            isDisabled={!selected || nextEvolutions?.length === 0}
          />
        </div>
      </footer>
    </Layout>
  );
};

export default Pokemon;
