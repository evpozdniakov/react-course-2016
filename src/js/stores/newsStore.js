import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import { MARK_NEWS_AS_READ, POST_COMMENT, DELETE_NEWS_ITEM, LOAD_ALL_NEWS, _START, _DONE, _FAIL, TOGGLE_SHOW_NEWS_ITEM } from 'constants'

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
          data.response.map(this.addItem)
          this.loading = false
          this.loaded = true
          this.change()
          break

        case LOAD_ALL_NEWS + _FAIL:
          this.loading = false
          this.loaded = false
          this.change()
          break

        case TOGGLE_SHOW_NEWS_ITEM:
          this.toggleShowNewsItem(data)
          this.change()
          break
      }
    })
  }

  addItem(item) {
    super.addItem({
      ...item,
      isRead: false,
      isExpanded: false,
    })
  }

  toggleShowNewsItem(data) {
    const { id } = data
    const newsItem = this.getItem(id)

    if (id === this.expandedNewsId) {
      newsItem.isExpanded = false
      this.expandedNewsId = null
    }
    else {
      this.collapsePreviouslyExpandedNews()
      newsItem.isExpanded = true
      this.expandedNewsId = id
    }
  }

  collapsePreviouslyExpandedNews() {
    if (this.expandedNewsId) {
      this.getItem(this.expandedNewsId).isExpanded = false
    }
  }
}
