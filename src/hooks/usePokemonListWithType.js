import { useEffect, useState } from 'react'
import { EVERY_POKEMON_ENDPOINT, POKEMON_TYPES_ENDPOINT } from '../services/constants'

export const usePokemonListWithType = ({ selectedType }) => {
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    if (selectedType !== 'any') {
      fetch(`${POKEMON_TYPES_ENDPOINT}${selectedType}`)
        .then(res => res.json())
        .then(data => {
          const { pokemon } = data
          const newPokemonList = pokemon.map(pokemon => pokemon.pokemon.name)
          setPokemonList(newPokemonList)
        })
    } else {
      fetch(EVERY_POKEMON_ENDPOINT)
        .then(res => res.json())
        .then(data => {
          const { results } = data
          const newPokemonList = results.map(pokemon => pokemon.name)
          setPokemonList(newPokemonList)
        })
    }
  }, [selectedType])

  return { pokemonList }
}
