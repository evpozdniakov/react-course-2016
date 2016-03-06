import randomId from 'random-id'

export function getRandomId() {
  return parseInt(randomId(20, '0'), 10)
}
