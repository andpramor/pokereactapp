import './PokemonType.css'

export const PokemonType = ({ name }) => {
  return <span className={`pokemonType pokemonType-${name}`}>{name}</span>
}
