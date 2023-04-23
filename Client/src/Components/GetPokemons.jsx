/* eslint-disable react/prop-types */
import {useQueryClient} from "react-query"
// import {useNavigate } from "react-router-dom"
import DeletePokemon from "./DeletePokemon";
const GetPokemons = ({isLoading}) => {
    const queryClient = useQueryClient();
    const cachedPokemons = queryClient.getQueryData('pokemons');
    const handlePokemonDeleted = (id) => {
        (cachedPokemons?.filter(pokemon => pokemon.id !== id));
      };
    return(
        <>
          <h1>Pokemons</h1>
      {isLoading && <p>Loading...</p>}
{!isLoading && cachedPokemons && (
  <div className="pokemon-list">
    {cachedPokemons?.map((pokemon,index) => (
      <div key={index} className="pokemon-item">
       {pokemon["#"] && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon["#"]}.png`} alt={pokemon.Name} />}
        <div className="pokemon-info">
          <h2>{pokemon.Name}</h2>
          <p>Type 1: {pokemon["Type 1"]}</p>
          {pokemon["Type 2"] && <p>Type 2: {pokemon["Type 2"]}</p>}
          <p>Total: {pokemon.Total}</p>
          <DeletePokemon id={pokemon["#"]} onPokemonDeleted={handlePokemonDeleted} />
        </div>
      </div>
    ))}
  </div>
)}</>
    )
}
export default GetPokemons;
