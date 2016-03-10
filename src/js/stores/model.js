export default class Model {
  constructor(data, stores) {
    Object.assign(this, data)
    this._stores = stores
  }

  getRelation = (type, filter) => {
    if (!this[type]) {
      return []
    }

    if (!this._stores[type]) {
      return []
    }

    const filterFn = this._getFilterFn(filter)

    return this[type].map(id => {
      return {
        ...this._stores[type].getItem(id),
        parentId: this.id,
      }
    }).filter(filterFn)
  }

  _getFilterFn(filter) {
    return (item) => {
      return Object.keys(filter).reduce((bool, key) => {
        return bool && (item[key] === filter[key])
      }, true)
    }
  }
}
