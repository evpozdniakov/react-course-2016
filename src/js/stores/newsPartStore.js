import SimpleStore from 'stores/simpleStore'

export default class NewsPartStore extends SimpleStore {
  markAsRead(id) {
    const filtered = this._items.filter(item => item.id === id)

    if (filtered.length === 1) {
      filtered[0].isRead = true
    }
  }

  getAllUnread() {
    return this._items.filter(item => item.isRead != true)
  }
}
