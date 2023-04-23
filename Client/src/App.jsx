import usePokemons from "./hooks/useFetch";
import SearchPokemon from "./Components/SearchPokemon";
import CreatePokemon from "./Components/CreatePokemon";
import GetPokemons from "./Components/GetPokemons";
import "./App.css";
function App() {
  const { pokemons, isLoading } = usePokemons();
  return (
    <div>
      <SearchPokemon/>
      <CreatePokemon pokemons={pokemons} />
      <GetPokemons isLoading={isLoading} />
      
    </div>
  );
}

export default App;
