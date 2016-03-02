import {EventEmitter} from 'events'

class SimpleStore extends EventEmitter {
  constructor(data, stores) {
    super()

    this._stores = stores
    this._items = []

    data.forEach(itemData => {
      this.addItem(itemData)
    })
  }

  change() {
    this.emit('STORE_CHANGE')
  }

  addEventListener(callback) {
    this.on('STORE_CHANGE', callback)
  }

  removeEventListener(callback) {
    this.removeListener('STORE_CHANGE', callback)
  }

  deleteById(id) {
    console.log('--- store will delete item by id', id);
  }

  addItem(itemData) {
    this._items.push(itemData)
  }

  getItem(id) {
    const filtered = this._items.filter(itemData => itemData.id === id)

    return filtered.length === 1 ? filtered[0] : null
  }

  getAll() {
    return this._items
  }

  deleteItem(id) {
    this._items = this._items.filter(itemData => itemData.id !== id)
  }
}

export default SimpleStore
