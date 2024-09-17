import { useState } from 'react'
import './FavsList.css'
import { Modal } from '../Modal/Modal'
import { LandscapeCard } from '../LandscapeCard/LandscapeCard'

export const FavsList = ({ favs, emptyFavs, removeFromFavs }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleSelect = (pokemon) => {
    setSelectedPokemon(pokemon)
    setShowModal(true)
  }

  const handleDeselect = () => {
    setSelectedPokemon(null)
    setShowModal(false)
  }

  const handleRemoveSelected = () => {
    removeFromFavs(selectedPokemon)
    setShowModal(false)
  }

  return (
    <>
      {favs.length > 0 &&
        <div className='favsList'>
          <ul className='favsList--listContainer'>
            {favs.map((pokemonFav) =>
              <li
                key={pokemonFav.name + pokemonFav.shiny}
                className='favsList--listItem'
                onClick={() => handleSelect(pokemonFav)}
              >
                <LandscapeCard pokemon={pokemonFav} removeFromList={removeFromFavs} />
              </li>)}
          </ul>
          <p className='favsList--reset' onClick={emptyFavs}>Reset your favs list</p>
        </div>}
      {showModal &&
        <Modal handleHide={handleDeselect}>
          <LandscapeCard pokemon={selectedPokemon} removeFromList={removeFromFavs} noTransition />
          <div className='favsList__selected--controls'>
            <button>Add to team / remove from team</button>
            <button onClick={handleRemoveSelected}>Remove from favs</button>
          </div>
        </Modal>}
    </>
  )
}
