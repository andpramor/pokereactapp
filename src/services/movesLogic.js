import { MOVE_POOL_SIZE } from './constants.js'
import { getRandomNumberWithMax } from './pokemonLogic.js'

// Get random unique move numbers set, based on the number of moves a given pokemon has available
const getRandomMoveNumbers = (numberOfAvailableMoves) => {
  const moveNumbers = new Set()
  while (moveNumbers.size < MOVE_POOL_SIZE) {
    moveNumbers.add(getRandomNumberWithMax(numberOfAvailableMoves))
  }
  return Array.from(moveNumbers)
}

// Receives move endpoints array and returns move objects array: { name: move_name, type: move_type }
const fetchMoves = async (moveEndpoints) => {
  const newMoves = []
  try {
    // Parallel fetchs all URLs, ends when all fetchs end:
    const responses = await Promise.all(moveEndpoints
      .map(endpoint =>
        fetch(endpoint)))
    const data = await Promise.all(responses
      .map(res =>
        res.json()))
    data.forEach(({ name, type }) => {
      name = name.charAt(0).toUpperCase() + name.slice(1)
      newMoves.push({ name, type: type.name }) // Es lo mismo que poner name: name.
    })
    return newMoves
  } catch (error) {
    console.log('Error fetching attacks data: ', error)
    return []
  }
}

export const getRandomMovePool = (availableMoves) => {
  const movesNumbers = getRandomMoveNumbers(availableMoves.length)
  const movesEndpoints = []
  movesNumbers.forEach(element => {
    movesEndpoints.push(availableMoves[element - 1].move.url) // getRandomMoveNumbers goes from 1 to array.length, hence the -1 here
  })
  return fetchMoves(movesEndpoints)
}
