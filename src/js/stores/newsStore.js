import SimpleStore from 'stores/simpleStore'
import AppDispatcher from 'dispatcher'

export default class NewsStore extends SimpleStore {
  constructor(...args) {
    super(...args)

    AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case 'DELETE_NEWS_ITEM':
          this.deleteItem(data.id)
          this.change()
          break
        case 'MARK_NEWS_AS_READ':
          this._items.filter(newsItem => newsItem.id === data.id)[0].isRead = true
          this.change()
          break
      }
    })
  }

  getAllUnread() {
    return this._items.filter(newsItem => newsItem.isRead != true)
  }
}
