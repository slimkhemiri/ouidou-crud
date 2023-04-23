const {fetchCsvData} = require("../services/csvService")

let rows;

// Récupère les données CSV depuis l'URL et les stocke dans la variable rows
fetchCsvData(process.env.CSV_URL)
  .then((data) => {
    rows = data;
  })
  .catch((error) => {
    console.error(error);
  });

// Fonction pour récupérer tous les pokemons
function getAllPokemons() {
  return rows;
}

// Fonction pour récupérer un pokemon par son ID
function getPokemonById(id) {
  const pokemon = rows.find((row) => row["#"] === id);
  return pokemon;
}

function addPokemon(pokemon) {
    rows.push(pokemon);
    return pokemon;
}

// Fonction pour mettre à jour un pokemon existant
function updatePokemon(id, updatedPokemon) {
  const existingPokemon = rows.find((row) => row["#"] === id);
  if (existingPokemon) {
    Object.assign(existingPokemon, updatedPokemon);
    return existingPokemon;
  } else {
    return null;
  }
}

// Fonction pour supprimer un pokemon
function deletePokemon(id) {
  const index = rows.findIndex((row) => row["#"] === id);
  if (index !== -1) {
    rows.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

module.exports = { getAllPokemons, getPokemonById, addPokemon, updatePokemon, deletePokemon };
