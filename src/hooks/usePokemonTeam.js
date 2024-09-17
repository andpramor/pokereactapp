import { useEffect, useState } from 'react'
import { TEAM_SIZE } from '../services/constants'
import { usePokemon } from './usePokemon'

export const usePokemonTeam = () => {
  const [team, setTeam] = useState([])

  useEffect(() => {
    const getTeam = async () => {
      const responses = Array.from({ length: TEAM_SIZE }, () => usePokemon())
      const teamMembers = (await Promise.all(responses)).map(member => member.pokemon)
      console.log(teamMembers)
      setTeam(teamMembers)
    }

    getTeam()
  }, [])
  return team
}
