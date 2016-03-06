import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import { MARK_NEWS_AS_READ, POST_COMMENT, DELETE_NEWS_ITEM, LOAD_ALL_NEWS_START, LOAD_ALL_NEWS_SUCCESS, LOAD_ALL_NEWS_FAIL } from 'constants'

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

        case LOAD_ALL_NEWS_START:
          this.loading = true
          this.loaded = false
          this.change()
          break

        case LOAD_ALL_NEWS_SUCCESS:
          data.news.map(Object.assign(this.addItem, {isRead: false}))
          this.loading = false
          this.loaded = true
          this.change()
          break

        case LOAD_ALL_NEWS_FAIL:
          this.loading = false
          this.loaded = false
          this.change()
          break
      }
    })
  }
}
