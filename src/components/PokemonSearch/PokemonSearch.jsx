import { useEffect, useState } from 'react'
import { usePokemonListWithType } from '../../hooks/usePokemonListWithType'
import './PokemonSearch.css'

export const PokemonSearch = ({ handleSelection }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showList, setShowList] = useState(false)
  const { pokemonList } = usePokemonListWithType({ selectedType: 'any' })
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setSearchResults(pokemonList)
  }, [pokemonList])

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    const newSearchResults = pokemonList.filter(pokemon => pokemon.includes(newSearchTerm))
    setSearchResults(newSearchResults)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSelection(searchTerm)
    setSearchTerm('')
    setSearchResults(pokemonList)
    event.target.elements.pokesearch.blur()
  }

  // I trigger this method with mouse down cause on click triggers the on blur from the input first, so the element hides before it's clicked.
  const handleClick = (pokemonId) => {
    handleSelection(pokemonId)
    setSearchResults(pokemonList)
    setSearchTerm('')
  }

  const handleFocus = () => setShowList(true)

  const handleBlur = () => setShowList(false)

  return (
    <form onSubmit={handleSubmit} className='pokemonSearch'>
      <input value={searchTerm} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} className='pokemonSearch--input' type='text' name='pokesearch' placeholder='Bulbasaur, 17, Pikachu...' />
      {showList && searchTerm !== '' &&
        <ul className='pokemonSearch--results'>
          {searchResults.map(pokemon =>
            <li key={pokemon} className='pokemonSearch--results--item' onMouseDown={() => handleClick(pokemon)}>
              {pokemon}
            </li>)}
        </ul>}
    </form>
  )
}
