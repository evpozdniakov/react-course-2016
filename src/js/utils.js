import store from 'store'

export function getRelation(obj, relation) {
  const state = store.getState()

  if (!obj[relation] || !state[relation]) {
    return null
  }

  return obj[relation].map(id => {
    return state[relation].filter(item => item.id === id)[0]
  })
}
