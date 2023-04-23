const { getAllPokemons, getPokemonById, addPokemon, updatePokemon, deletePokemon } = require("../models/pokemons");

const getAll = (req, res) => {
  const pageSize = 10;
  const page = req.query.page || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const results = getAllPokemons().slice(startIndex, endIndex);
  res.json({
    total: results.length,
    results: results,
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  const pokemon = getPokemonById(id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ message: "Pokemon not found" });
  }
};

const create = (req, res) => {
  const pokemon = req.body;
  const createdPokemon = addPokemon(pokemon);
  if (createdPokemon) {
    res.status(201).json(createdPokemon);
  } else {
    res.status(400).json({ message: "Invalid Pokemon data" });
  }
};

const update = (req, res) => {
  const id = req.params.id;
  const updatedPokemon = req.body;
  const result = updatePokemon(id, updatedPokemon);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Pokemon not found" });
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  const result = deletePokemon(id);
  if (result) {
    res.json({ message: "Pokemon deleted" });
  } else {
    res.status(404).json({ message: "Pokemon not found" });
  }
};

module.exports = { getAll, getById, create, update, remove };
