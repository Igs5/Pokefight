import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

const PokeList=()=>{
    const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonResults = response.data.results;

        // Fetch detailed information for each Pokémon
        const detailedPokemonPromises = pokemonResults.map(pokemon => axios.get(pokemon.url));
        const detailedPokemonResponses = await Promise.all(detailedPokemonPromises);

        // Extract relevant data from each detailed response
        const detailedPokemons = detailedPokemonResponses.map(response => {
          const { id, name, types, sprites } = response.data;
          return {
            id,
            name,
            types: types.map(typeInfo => typeInfo.type.name),
            image: sprites.front_default
          };
        });

        setPokemons(detailedPokemons);
        console.log(detailedPokemons);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    }

    fetchData();
  }, []);

 

    return(
        <div>
           <h1>Pokémon List</h1>
           <ul>
             {pokemons.map(pokemon => (
                <div key={pokemon.id}>
               <li key={pokemon.name }>
                <h3>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</h3>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>Types: {pokemon.types.join(', ')}</p>
                
               </li>
               </div>
             ))}
           </ul>
         </div>
        
    )
}
export default PokeList;