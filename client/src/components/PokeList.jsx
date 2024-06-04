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
                <div key={pokemon.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
               <li key={pokemon.name }>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</h3>
                <img src={pokemon.image} alt={pokemon.name} className="rounded-t-lg" />
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" >Types: {pokemon.types.join(', ')}</p>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Choose me</button>
               </li>
               <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
        </div>
               </div>

             ))}
           </ul>
         </div>
        
    )
}
export default PokeList;