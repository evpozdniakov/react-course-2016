import {EventEmitter} from 'events'
import Model from './model'

class SimpleStore extends EventEmitter {
  constructor(data, stores) {
    super()

    this._stores = stores
    this._items = []
    this._maxId = 0

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
    this._items.push(new Model(itemData, this._stores))
    this._maxId = itemData.id
  }

  getItem = (id) => {
    const filtered = this._items.filter(itemData => itemData.id === id)

    return filtered.length === 1 ? filtered[0] : null
  }

  getAll() {
    return this._items.slice()
  }

  deleteItem(id) {
    this._items = this._items.filter(itemData => itemData.id !== id)
  }

  generateNextId() {
    return ++this._maxId
  }
}

export default SimpleStore
