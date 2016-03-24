import store from 'store'

export function getRelation(obj, relation) {
  const state = store.getState()

  if (!obj[relation] || !state[relation]) {
    return null
  }

  const ids = obj[relation]
  return state[relation].filter(item => ids.indexOf(item.id) >= 0)
}
