import { useState } from "react";
import { useQuery } from "react-query";

function SearchPokemon() {
  const [id, setId] = useState("");

  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = useQuery(["pokemon", id], async () => {
    if (id === "") {
      return null;
    }
    const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
    if (response.status === 404) {
      throw new Error("Pokemon Not Found");
    }
    const data = await response.json();
    return data;
  }, {
    cacheTime: 3000,
    staleTime: 10000,
  }
  );

  return (
    <div>
      <h1>Pokemon Search</h1>
      <form>
        <div>
          <label htmlFor="id">Pokemon ID:</label>
          <input
            type="number"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </form>
      {isPokemonLoading && <div className="spinner"></div>}
      {!isPokemonLoading && pokemonError && <h2>{pokemonError.message}</h2>}
      <div className="pokemon-list">
        {pokemon && id && (
          <div className="pokemon-item">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon["#"]}.png`}
              alt={pokemon.Name}
            />
            <div className="pokemon-info">
              <h2>{pokemon.Name}</h2>
              <p>Type 1: {pokemon["Type 1"]}</p>
              {pokemon["Type 2"] && <p>Type 2: {pokemon["Type 2"]}</p>}
              <p>Total: {pokemon.Total}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPokemon;
