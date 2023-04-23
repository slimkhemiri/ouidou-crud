/* eslint-disable react/prop-types */
import { useMutation,useQueryClient } from 'react-query';

function DeletePokemon({ id, onPokemonDeleted }) {
    const queryClient = useQueryClient();
  const deletePokemon = useMutation(async () => {
    const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete pokemon');
    }
  }, {
    onSuccess: () => {
        queryClient.invalidateQueries('pokemons');
      onPokemonDeleted(id);
    },
  });

  const handleClick = () => {
    deletePokemon.mutate();
  };

  return (
    <button className='delete-button' onClick={handleClick} >
     Delete
    </button>
  );
}
export default DeletePokemon;