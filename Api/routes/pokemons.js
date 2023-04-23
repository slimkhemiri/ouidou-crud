const express = require('express');
const router = express.Router();

const PokemonsController = require('../controllers/pokemons');

router.get('/api/pokemons', PokemonsController.getAll);
router.get('/api/pokemons/:id', PokemonsController.getById);
router.post('/api/pokemons', PokemonsController.create);
router.put('/api/pokemons/:id', PokemonsController.update);
router.delete('/api/pokemons/:id', PokemonsController.remove);

module.exports = router;
