import { useEffect, useState } from 'react'
import { POKEMON_TYPES_ENDPOINT } from '../services/constants'

export const useTypesList = () => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    fetch(POKEMON_TYPES_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        const { results } = data
        const typeNames = results.filter(type => type.name !== 'unknown' && type.name !== 'stellar').map(type => type.name)
        setTypes(typeNames)
      }
      )
  }, [])

  return { types }
}
