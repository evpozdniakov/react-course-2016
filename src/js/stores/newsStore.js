import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import { MARK_NEWS_AS_READ, POST_COMMENT, DELETE_NEWS_ITEM, LOAD_ALL_NEWS, _START, _DONE, _FAIL } from 'constants'

export default class NewsStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    this.dispatchToken = AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_NEWS_AS_READ:
          this.markAsRead(data.id)
          this.change()
          break

        case POST_COMMENT:
          AppDispatcher.waitFor([this._stores.comments.dispatchToken])

          let { commentId, newsId } = data

          let newsItem = this.getItem(newsId)
          newsItem.comments.push(commentId)

          this.change()
          break

        case DELETE_NEWS_ITEM:
          this.deleteItem(data.id)
          this.change()
          break

        case LOAD_ALL_NEWS + _START:
          this.loading = true
          this.loaded = false
          this.change()
          break

        case LOAD_ALL_NEWS + _DONE:
          data.response.map(newsItem => {
            this.addItem({
              ...newsItem,
              isRead: false
            })
          })
          this.loading = false
          this.loaded = true
          this.change()
          break

        case LOAD_ALL_NEWS + _FAIL:
          this.loading = false
          this.loaded = false
          this.change()
          break
      }
    })
  }
}
