import { PokemonType } from '../PokemonType/PokemonType.jsx'

import './PokemonCard.css'

export const PokemonCard = ({ pokemon }) => {
  return (
    <>
      {pokemon &&
        <div className='pokemonCard'>

          <div className={`pokemonCard--content ${pokemon.shiny ? 'pokemonCard__shiny' : ''}`}>

            <section className='pokemonCard--front'>
              <h2 translate='no'>{pokemon.name}</h2>
              <div className='pokemonCard--sprite'>
                {pokemon.shiny
                  ? <img src={pokemon.sprite_shiny} alt={`${pokemon.name}'s front sprite`} />
                  : <img src={pokemon.sprite} alt={`${pokemon.name}'s front sprite`} />}
              </div>
              <section className='pokemonCard--types'>
                {pokemon.types.map(type =>
                  <PokemonType key={type} name={type} />
                )}
              </section>
            </section>

            <section className='pokemonCard--back'>
              <header>
                <h4>{pokemon.name} base stats</h4>
              </header>
              {pokemon.stats &&
                <ul className='pokemonCard--statsList'>
                  {pokemon.stats.map(stat =>
                    <li key={stat.name} className='pokemonCard--stat'>
                      <span>
                        {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}
                      </span>
                      <span>{stat.base}</span>
                    </li>)}
                </ul>}
            </section>

          </div>

        </div>}
    </>
  )
}
