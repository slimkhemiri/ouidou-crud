import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

const CreatePokemon = () => {
  const [newPokemon, setNewPokemon] = useState({});
  const queryClient = useQueryClient();
  const { mutate: addPokemon } = useMutation(
    async () => {
      const response = await fetch("http://localhost:3000/api/pokemons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPokemon),
      });
      const data = await response.json();
      return data;
    },
    {
      onSuccess: (data) => {
        // Get the previous data from the cache
        const prevData = queryClient.getQueryData("pokemons");

        // Update the cache with the new data
        queryClient.setQueryData("pokemons", (oldData) => [
          ...oldData,
          { ...data, id: prevData.length + 1 }, // Add the new pokemon with an incremented id
        ]);
        setNewPokemon({});
      },
    }
  );
  return (
    <>
      <h1>Add a new Pokemon</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPokemon();
        }}
      >
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={newPokemon.Name || ""}
            onChange={(e) =>
              setNewPokemon({ ...newPokemon, Name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="Type1">Type 1:</label>
          <input
            type="text"
            id="Type1"
            name="Type1"
            value={newPokemon["Type1"] || ""}
            onChange={(e) =>
              setNewPokemon({ ...newPokemon, Type1: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="Type2">Type 2:</label>
          <input
            type="text"
            id="Type2"
            name="Type2"
            value={newPokemon["Type2"] || ""}
            onChange={(e) =>
              setNewPokemon({ ...newPokemon, Type2: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="Total">Total:</label>
          <input
            type="text"
            id="Total"
            name="Total"
            value={newPokemon.Total || ""}
            onChange={(e) =>
              setNewPokemon({ ...newPokemon, Total: e.target.value })
            }
          />
        </div>
        <button type="submit">Add Pokemon</button>
      </form>
    </>
  );
};

export default CreatePokemon;
