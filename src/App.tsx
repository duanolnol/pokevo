import Search from "./presenter/components/Search";
import List from "./presenter/components/List";

const datas = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    id: "1",
    imageUrl: {
      small:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      large:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    },
  },
];

const App = () => {
  const handleChoose = () => alert("Choose Pokemon");

  return (
    <main className="flex flex-col h-screen">
      <div className="flex justify-center p-5">
        <Search />
      </div>
      <div className="flex-grow overflow-auto mt-2 p-4 pb-15">
        <List datas={datas} />
      </div>
      <div className="bg-white w-full fixed bottom-0 h-24 lg:h-32 flex justify-center items-center">
        <button
          className="w-full lg:w-1/5 bg-green-900 text-white rounded-full p-4 mx-4"
          onClick={handleChoose}
        >
          I choose you
        </button>
      </div>
    </main>
  );
};

export default App;
