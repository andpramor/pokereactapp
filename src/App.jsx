import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import { ChoosePokemon } from './components/ChoosePokemon/ChoosePokemon'
import { PokemonTeam } from './components/PokemonTeam/PokemonTeam'
import { FavsList } from './components/FavsList/FavsList'

function App () {
  const [team, setTeam] = useState([])
  const [favs, setFavs] = useState([])

  const addToTeam = (pokemon) => {
    const newPokemon = { ...pokemon, id: uuidv4() } // I add UUID so I can delete a team member without deleting every member that's the same pokémon.
    const newTeam = [...team, newPokemon]
    setTeam(newTeam)
  }

  const removeFromTeam = (deletedId) => {
    const newTeam = team.filter(pokemon => pokemon.id !== deletedId)
    setTeam(newTeam)
  }

  const emptyTeam = () => {
    setTeam([])
  }

  const addToFavs = (pokemon) => {
    const { movePool, ...newPokemonFav } = pokemon
    if (favs.some(pokemon => pokemon.name === newPokemonFav.name && pokemon.shiny === newPokemonFav.shiny)) return
    const newFavs = [newPokemonFav, ...favs]
    setFavs(newFavs)
  }

  const removeFromFavs = (pokemon) => {
    const newFavs = favs.filter(fav => !(fav.name === pokemon.name && fav.shiny === pokemon.shiny))
    setFavs(newFavs)
  }

  const emptyFavs = () => setFavs([])

  return (
    <>
      <main className='app'>
        <div className='app--teamBuilder'>
          <ChoosePokemon addToTeam={addToTeam} currentTeamSize={team.length} emptyTeam={emptyTeam} favs={favs} addToFavs={addToFavs} removeFromFavs={removeFromFavs} />
          {team.length > 0 &&
            <PokemonTeam team={team} removeFromTeam={removeFromTeam} />}
        </div>
        <FavsList favs={favs} emptyFavs={emptyFavs} removeFromFavs={removeFromFavs} />
      </main>
    </>
  )
}

export default App
