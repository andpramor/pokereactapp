import { useEffect, useState } from 'react'
import { getPokemonById, getRandomPokemonNumber } from '../services/pokemonLogic.js'

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState({ name: '', sprite: '', types: [], stats: [], shiny: false })
  const [shiny, setShiny] = useState(false)

  const getPokemon = (id = null) => {
    if (id === null) {
      id = getRandomPokemonNumber()
    } else if (Number(id.charAt(0)) === 0) {
      id = id.slice(1) // Aceptar 01 = 1, en lugar de 01 = Missingno.
    }
    getPokemonById(id)
      .then(pokemon => setPokemon(pokemon))
  }

  const toggleShiny = () => {
    setShiny(!shiny)
  }

  useEffect(getPokemon, [])

  useEffect(() => {
    setPokemon({ ...pokemon, shiny })
  }, [shiny])

  return { pokemon, getPokemon, toggleShiny }
}
