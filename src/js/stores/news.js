import NewsPartStore from 'stores/newsParts'
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
        case LOAD + _ALL_NEWS + _DONE:
        case LOAD + _ALL_NEWS + _FAIL:
          this._loadAllNews(type, data)
          break

        case LOAD + _NEWS_ITEM + _START:
        case LOAD + _NEWS_ITEM + _DONE:
        case LOAD + _NEWS_ITEM + _FAIL:
          this._loadNewsItem(type, data)
          break

        case TOGGLE_SHOW + _NEWS_ITEM:
          this._toggleShowNewsItem(data)
          this.change()
          break
      }
    })
  }

  _addItem(item) {
    super._addItem({
      ...item,
      isRead: false,
      isExpanded: false,
    })
  }

  _toggleShowNewsItem(data) {
    const { id } = data
    const newsItem = this.getItem(id)

    if (id === this.expandedNewsId) {
      newsItem.isExpanded = false
      this.expandedNewsId = null
    }
    else {
      this._collapsePreviouslyExpandedNews()
      newsItem.isExpanded = true
      this.expandedNewsId = id
    }
  }

  _collapsePreviouslyExpandedNews() {
    if (this.expandedNewsId) {
      this.getItem(this.expandedNewsId).isExpanded = false
    }
  }

  _loadAllNews(type, data) {
    switch(type) {
      case LOAD + _ALL_NEWS + _START:
        this.isLoading = true
        this.isLoaded = false
        this.change()
        break

      case LOAD + _ALL_NEWS + _DONE:
        data.response.map(this._addItem)
        this.isLoading = false
        this.isLoaded = true
        this.change()
        break

      case LOAD + _ALL_NEWS + _FAIL:
        this.isLoading = false
        this.isLoaded = false
        this.change()
        break
    }
  }

  _loadNewsItem(type, data) {
    const { id } = data.origData
    const newsItem = this.getItem(id)

    switch(type) {
      case LOAD + _NEWS_ITEM + _START:
        newsItem.isLoading = true
        newsItem.isLoaded = false
        this.change()
        break

      case LOAD + _NEWS_ITEM + _DONE:
        newsItem.content = data.response.content
        newsItem.isLoading = false
        newsItem.isLoaded = true
        this.change()
        break

      case LOAD + _NEWS_ITEM + _FAIL:
        newsItem.isLoading = false
        newsItem.isLoaded = false
        this.change()
        break
    }
  }
}
