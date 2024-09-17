import { PokemonCard } from '../PokemonCard/PokemonCard'

import './PokemonTeam.css'

export const PokemonTeam = ({ team, removeFromTeam }) => {
  return (
    <section className='pokemonTeam'>
      {team.map((pokemon) => (
        <div className='pokemonTeam--member' key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
          <footer className='pokemonTeam--member--discard' onClick={() => removeFromTeam(pokemon.id)}>Remove member</footer>
        </div>
      ))}
    </section>
  )
}
