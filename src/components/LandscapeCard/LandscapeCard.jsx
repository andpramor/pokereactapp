import './LandscapeCard.css'
import { PokemonType } from '../PokemonType/PokemonType'

export const LandscapeCard = ({ pokemon, removeFromList, noTransition }) => {
  const handleRemoveFromList = (event, pokemon) => {
    event.stopPropagation()
    removeFromList(pokemon)
  }
  return (
    <div className={`landscapeCard ${noTransition ? 'landscapeCard__final' : ''} ${pokemon.shiny ? 'landscapeCard__shiny' : ''}`}>
      <img
        style={{ width: '100%' }}
        src={`${pokemon.shiny
                ? pokemon.sprite_shiny
                : pokemon.sprite}`}
        alt={`${pokemon.name}${pokemon.shiny
                ? ' shiny'
                : ''}`}
      />
      <aside className='landscapeCard--info'>
        <section className='landscapeCard--types'>
          {pokemon.types.map((type, index) =>
            <div key={type}>
              <PokemonType name={type} />
            </div>)}
        </section>
        <section className='landscapeCard--name'>
          {`${pokemon.shiny ? ' Shiny' : ''} ${pokemon.name}`}
        </section>
      </aside>
      {!noTransition && <p className='landscapeCard--discard' onClick={(event) => handleRemoveFromList(event, pokemon)}>Remove fav</p>}
    </div>
  )
}
