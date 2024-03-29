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
import { BerryItemResult, Firmness } from "@/interfaces/berry";
import ListBerry from "@/presenter/components/List/Berry";
import SkeletonPokemonDetail from "@/presenter/components/Skeleton/PokemonDetail";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/presenter/components/Modal";
import ProgressBar from "@/presenter/components/ProgressBar";
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
  const [percent, setPercent] = React.useState<number>(0);
  const { data: berryList, isLoading: isLoadingBerry } = useBerry(100);
  const berries: BerryItemResult[] = berryList?.results;
  const [selected, setSelected] = React.useState<BerryItemResult | null>(null);
  const [isEvolution, setIsEvolution] = React.useState(false);
  const [modal, setModal] = React.useState(false);

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
    setIsEvolution(false);
    setModal(false);
  };

  const feedPokemon = () => {
    const lastBerry = feed[feed.length - 1];
    if (selected) {
      const isSubtract = lastBerry?.firmness === selected.firmness;
      let newWeight = 0;
      if (isSubtract) {
        const updateWeight = stats.Weight - firmness[selected.firmness] * 2;
        newWeight = updateWeight < 0 ? 1 : updateWeight;
        notify(
          firmness[selected.firmness] * 2,
          selected.firmness,
          isSubtract,
          newWeight
        );
      } else {
        newWeight = stats.Weight + firmness[selected.firmness];
        notify(
          firmness[selected.firmness],
          selected.firmness,
          isSubtract,
          newWeight
        );
      }
      setFeed([...feed, { ...selected, weight: firmness[selected.firmness] }]);
      setStats({ ...stats, Weight: newWeight });
      setWeight([...weight, newWeight]);
    }
  };

  React.useEffect(() => {
    if (!pokemon) {
      navigate("/");
    }
  }, [navigate, pokemon]);

  React.useEffect(() => {
    if (
      pokemonDetail &&
      pokemonDetail.nextEvolution &&
      pokemonDetail.nextEvolution[0]?.stats
    ) {
      const nextWeight = pokemonDetail.nextEvolution[0]?.stats?.weight;
      const percent = (stats.Weight / nextWeight) * 100;
      setNextEvolutions(pokemonDetail.nextEvolution);
      setPercent(+percent.toFixed());
    }
  }, [pokemonDetail, stats.Weight]);

  React.useEffect(() => {
    if (
      pokemonDetail &&
      pokemonDetail.nextEvolution &&
      pokemonDetail.nextEvolution[0]?.stats
    ) {
      if (pokemonDetail.nextEvolution[0]?.stats?.weight - stats.Weight <= 0) {
        setIsEvolution(true);
        setModal(true);
      }
    }
  }, [pokemonDetail, stats.Weight]);

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

  const notify = (
    firmnessWeight: number,
    firmness: Firmness,
    isSubtract: boolean,
    newWeight: number
  ) => {
    const isEvolution =
      nextEvolutions &&
      nextEvolutions.length > 0 &&
      nextEvolutions[0].stats &&
      newWeight >= nextEvolutions[0].stats.weight;
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } w-full max-w-md flex justify-center items-center bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 p-4`}
        >
          {isEvolution ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg font-medium text-gray-900 capitalize">
                Congratulations, your Pokemon ready to evolution !
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center space-x-1">
                <p className="text-lg font-medium text-gray-900">
                  Your firmness berry is
                </p>
                <p
                  className={`text-xl font-bold ${
                    isSubtract ? "text-red-500" : "text-green-500"
                  } capitalize`}
                >
                  {firmness.replace("-", " ")}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <p
                  className={`text-3xl font-bold ${
                    isSubtract ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isSubtract ? `- ${firmnessWeight}` : `+ ${firmnessWeight}`}
                </p>
                <p
                  className={`text-lg font-medium ${
                    isSubtract ? "text-red-600" : "text-green-500"
                  }`}
                >
                  Weight
                </p>
              </div>
            </div>
          )}
        </div>
      ),
      { duration: 2000 }
    );
  };

  return (
    <Layout>
      {modal ? (
        <Modal>
          <div className="flex flex-col items-center p-6 mx-4 bg-slate-200 border-0 rounded-3xl">
            <div className="text-xl font-bold text-gray-900">
              This is your next Pokemon Evolution
            </div>
            <div className="text-3xl font-bold text-yellow-500 capitalize">
              {nextEvolutions && nextEvolutions[0]?.name}
            </div>
            <img
              className="w-40 h-auto my-4"
              src={`${nextEvolutions && nextEvolutions[0]?.imageUrl.gif}`}
              alt="Logo"
            />
            <Button
              title="Evolution"
              ariaLabel="Evolution"
              handleClick={handleEvolution}
            />
          </div>
        </Modal>
      ) : null}
      <Toaster position="top-center" />
      <header className="w-full flex justify-center items-center px-3 lg:px-8">
        <img className="w-20 lg:w-32 h-auto" src="/logo.png" alt="Logo" />
        <div className="flex w-full justify-center items-center space-x-6 p-4 bg-transparent">
          <div className="text-gray-900 dark:text-yellow-500 font-bold text-3xl capitalize">
            {pokemon?.name}
          </div>
          <ThemeSwitcher />
        </div>
        <button onClick={onRelease}>
          <img src="/remove.svg" alt="remove" className="w-10 lg:w-8 h-auto" />
        </button>
      </header>
      <section className="w-full lg:w-1/2 p-4 pb-20 lg:pb-20">
        {isLoadingPokemon ? (
          <SkeletonPokemonDetail />
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex w-full lg:w-fit justify-center items-center mt-4 border-8 rounded-3xl border-yellow-500 space-x-6 p-4 mx-4">
              <div className="flex justify-center items-center">
                <div className="w-24 h-auto">
                  <img
                    alt={`${pokemon?.name}`}
                    className="w-full h-auto"
                    src={pokemonDetail?.imageUrl.gif}
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
                      className={`font-bold ${
                        key === "Weight"
                          ? "text-orange-500 text-3xl"
                          : "text-yellow-500 text-xl"
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
        !isEvolution &&
        nextEvolutions &&
        nextEvolutions?.length > 0 ? (
          <div className="flex flex-col justify-center items-center mt-4">
            <div className="flex justify-center items-center space-x-2">
              <p className="text-gray-500 text-lg">Next Evolution</p>
              <p className="text-3xl font-bold text-yellow-500 capitalize">
                {nextEvolutions && nextEvolutions[0]?.name}
              </p>
            </div>
            <div className="flex justify-center items-center mb-2 space-x-2">
              <div className="flex justify-center items-center space-x-2">
                <p className="text-gray-500 text-lg">Target Weight</p>
                <p className="text-3xl font-bold text-orange-500">
                  {nextEvolutions &&
                    nextEvolutions[0]?.stats &&
                    nextEvolutions[0]?.stats.weight}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center mb-2 space-x-2">
              <ProgressBar percent={percent} />
              <span className="text-gray-900 dark:text-gray-100 font-bold text-lg">{`${percent}%`}</span>
            </div>
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
            isDisabled={nextEvolutions?.length === 0 || isEvolution}
            setSelected={(item) => setSelected(item)}
          />
        </div>
      </section>
      <footer className="flex justify-center items-center">
        <div className="w-full lg:w-1/3 fixed bottom-0 h-20 flex justify-center items-center">
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
            isDisabled={
              !selected || nextEvolutions?.length === 0 || isEvolution
            }
          />
        </div>
      </footer>
    </Layout>
  );
};
export default Pokemon;
