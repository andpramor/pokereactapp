import { PokemonCard } from '../PokemonCard/PokemonCard'
import { PokemonSearch } from '../PokemonSearch/PokemonSearch.jsx'
import { usePokemon } from '../../hooks/usePokemon.js'
import './ChoosePokemon.css'
import { TEAM_SIZE } from '../../services/constants.js'
import { PokemonByType } from '../PokemonByType/PokemonByType.jsx'
import { useEffect, useState } from 'react'

export const ChoosePokemon = ({ addToTeam, currentTeamSize, emptyTeam, favs, addToFavs, removeFromFavs }) => {
  const { pokemon, getPokemon, toggleShiny } = usePokemon()
  const [itsAFav, setItsAFav] = useState(false)

  useEffect(() => {
    if (favs.some(fav => fav.name === pokemon.name && fav.shiny === pokemon.shiny)) {
      setItsAFav(true)
    } else {
      setItsAFav(false)
    }
  }, [pokemon, favs])

  const handleSelection = (id) => {
    getPokemon(id)
  }

  const handleAddToTeam = () => {
    if (currentTeamSize < 6) addToTeam(pokemon)
  }

  const handleAddToFavs = () => {
    addToFavs(pokemon)
  }

  const handleRemoveFav = () => {
    removeFromFavs(pokemon)
  }

  const handleEmpty = () => {
    emptyTeam()
  }

  const handleShiny = () => {
    toggleShiny()
  }

  return (
    <section className='choosePokemon'>
      {currentTeamSize < TEAM_SIZE &&
        <>
          <h2>Choose your Pokémon</h2>
          <div className='choosePokemon--content'>
            <div className='choosePokemon--inputs'>
              <p>By name or national dex number:</p>
              <PokemonSearch handleSelection={handleSelection} />
              <p>Or:</p>
              <button className='btn-outlined' onClick={() => getPokemon()}>Get a random one</button>
              <p>Or:</p>
              <PokemonByType handleSelection={handleSelection} />
            </div>
            <aside className='choosePokemon--cardAside'>
              <PokemonCard pokemon={pokemon} />
              <label className='choosePokemon--shinyToggler' htmlFor='shinyToggler' onClick={handleShiny}>
                <input className='choosePokemon--shinyCheckbox' type='checkbox' name='shinyToggler' value='Shiny' checked={pokemon.shiny} onChange={handleShiny} />
                Make it shiny!
              </label>
            </aside>
          </div>
        </>}
      {currentTeamSize === TEAM_SIZE &&
        <div className='choosePokemon--fullTeam'>Your team's full!</div>}
      <footer className='choosePokemon--footer'>
        {itsAFav
          ? <button className={`choosePokemon--favBtn choosePokemon--favBtn__del ${currentTeamSize === 6 ? 'hidden' : ''}`} onClick={handleRemoveFav}>Delete favourite</button>
          : <button className={`choosePokemon--favBtn ${currentTeamSize === 6 ? 'hidden' : ''}`} onClick={handleAddToFavs}>Add favourite</button>}
        {currentTeamSize < TEAM_SIZE && <button onClick={handleAddToTeam}>Add to your team</button>}
        {currentTeamSize > 0 &&
          <div className='choosePokemon--emptyTeamText' onClick={handleEmpty}>Discard team</div>}
      </footer>
    </section>
  )
}
