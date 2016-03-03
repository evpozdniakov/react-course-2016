import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import {MARK_NEWS_AS_READ, DELETE_NEWS_ITEM} from 'constants'

export default class NewsStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_NEWS_AS_READ:
          this.markAsRead(data.id)
          this.change()
          break

        case DELETE_NEWS_ITEM:
          this.deleteItem(data.id)
          this.change()
          break
      }
    })
  }
}
