import { useQuery } from 'react-query';

const usePokemons = () => {
  const { data, isLoading } = useQuery(
    "pokemons",
    async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pokemons");
        if (!response.ok) {
          throw new Error("Failed to fetch pokemons");
        }
        const data = await response.json();
        console.log(data.results);
        return data.results;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }, {
      cacheTime: 0,
      staleTime: 10000,
    });

  return { pokemons: data, isLoading };
}

export default usePokemons;