export default class Model {
  constructor(data, stores) {
    Object.assign(this, data)
    this._stores = stores
  }

  getRelation(type) {
    if (!this[type]) {
      return []
    }

    if (!this._stores[type]) {
      return []
    }

    return this[type].map(this._stores[type].getItem)
  }
}
