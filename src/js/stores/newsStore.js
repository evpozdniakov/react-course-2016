import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import { MARK_AS_READ, POST, DELETE, LOAD, TOGGLE_SHOW, _NEWS_ITEM, _ALL_NEWS, _COMMENT, _START, _DONE, _FAIL } from 'constants'

export default class NewsStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    this.dispatchToken = AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_AS_READ + _NEWS_ITEM:
          this.markAsRead(data.id)
          this.change()
          break

        case POST + _COMMENT:
          AppDispatcher.waitFor([this._stores.comments.dispatchToken])

          let { commentId, newsId } = data

          let newsItem = this.getItem(newsId)
          newsItem.comments.push(commentId)

          this.change()
          break

        case DELETE + _NEWS_ITEM:
          this.deleteItem(data.id)
          this.change()
          break

        case LOAD + _ALL_NEWS + _START:
          this.loading = true
          this.loaded = false
          this.change()
          break

        case LOAD + _ALL_NEWS + _DONE:
          data.response.map(this.addItem)
          this.loading = false
          this.loaded = true
          this.change()
          break

        case LOAD + _ALL_NEWS + _FAIL:
          this.loading = false
          this.loaded = false
          this.change()
          break

        case TOGGLE_SHOW + _NEWS_ITEM:
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
