import { useState } from 'react'
import { useTypesList } from '../../hooks/useTypeList.js'
import { usePokemonListWithType } from '../../hooks/usePokemonListWithType.js'
import './PokemonByType.css'

export const PokemonByType = ({ handleSelection }) => {
  const { types } = useTypesList()
  const [selectedType, setSelectedType] = useState('any')
  const { pokemonList } = usePokemonListWithType({ selectedType })
  const [showPokemonList, setShowPokemonList] = useState(false)

  const resetTypeSelects = () => {
    setSelectedType('')
    setShowPokemonList(false)
  }

  const handleTypeSelection = (e) => {
    const selected = e.target.value
    setSelectedType(selected)
    if (selected) setShowPokemonList(true)
  }

  const handlePokemonSelection = (e) => {
    const selected = e.target.value
    handleSelection(selected)
    resetTypeSelects()
  }

  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * pokemonList.length)
    const randomSelection = pokemonList[randomIndex]
    handleSelection(randomSelection)
    resetTypeSelects()
  }

  return (
    <section className={`pokemonByType ${showPokemonList ? 'pokemonByType__border' : ''}`}>
      <select name='pokemonTypes' value={selectedType} onChange={handleTypeSelection} className='pokemonByType--select pokemonByType--typeSelect'>
        <option value='' disabled>Select your favourite type!</option>
        <option value='any'>Any</option>
        {types.map(type => (
          <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
        ))}
      </select>
      <footer className='pokemonByType--footer'>
        {showPokemonList &&
          <select name='pokemonFromAType' value={selectedType} onChange={handlePokemonSelection} className='pokemonByType--select pokemonByType--pokemonSelect'>
            <option value='any' disabled>Choose your Pokémon!</option>
            {pokemonList.map(pokemon =>
              <option key={pokemon} value={pokemon}>{pokemon}</option>)}
          </select>}
        {showPokemonList && <button onClick={handleRandomClick}>Random {selectedType} type</button>}
      </footer>
    </section>
  )
}
