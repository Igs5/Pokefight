import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

const PokeList=()=>{
    const [pokemons, setPokemons] = useState([]);

    const typeColors = {
        grass: 'bg-green-500',
        water: 'bg-blue-500',
        fire: 'bg-red-500',
        electric: 'bg-yellow-500',
        bug: 'bg-green-300',
        normal: 'bg-gray-300',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-700',
        'grass-poison': 'bg-gradient-to-r from-green-500 to-purple-500',
        'flying-fire': 'bg-gradient-to-r from-red-500 to-yellow-500',
        'normal-flying': 'bg-gradient-to-r from-gray-300 to-pink-300',
        'bug-poison': 'bg-gradient-to-r from-green-300 to-purple-700',
        // Colours to be changed
      };

      const getBackgroundClass = (types) => {
        // Handle single type
        if (types.length === 1) {
          return typeColors[types[0]] || 'bg-white';
        }
        // Handle two types
        if (types.length === 2) {
          const combinedType = `${types[0]}-${types[1]}`;
          return typeColors[combinedType] || `bg-gradient-to-r from-${typeColors[types[0]]} to-${typeColors[types[1]]}`;
        }
        // Default background
        return 'bg-white';
      };
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           <h1>Pokémon List</h1>
           <ul>
             {pokemons.map(pokemon => (
                <div key={pokemon.id} 
                className={`max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 ${
                    getBackgroundClass(pokemon.types)
                  }`}
                >
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