import NewsPartStore from 'stores/newsParts'
import AppDispatcher from 'dispatcher'
import { loadNewsComments } from 'actions/comments'
import {LOAD, MARK_AS_READ, POST, DELETE, _COMMENT, _COMMENTS, _START, _DONE, _FAIL} from 'constants'

export default class CommentStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    this.dispatchToken = AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_AS_READ + _COMMENT:
          this.markAsRead(data.id)
          this.change()
          break

        case POST + _COMMENT:
          this.postComment(data)
          break

        case DELETE + _COMMENT:
          this.deleteItem(data.id)
          this.change()
          break

        case LOAD + _COMMENTS + _START:
        case LOAD + _COMMENTS + _DONE:
        case LOAD + _COMMENTS + _FAIL:
          this.loadComments(type, data)
          break
      }
    })
  }

  getOrLoadNewsItemComments(newsId) {
    const newsItem = this._stores.news.getItem(newsId)

    if (newsItem.hasLoadedComments) {
      const comments = newsItem.getRelation('comments')
      return comments
    }

    if (!newsItem.isLoadingComments) {
      loadNewsComments(newsId)
    }

    return []
  }

  postComment(data) {
    const { commentId, author, text, isRead } = data

    this._addItem({
      id: commentId,
      author,
      text,
      isRead,
    })
  }

  loadComments(type, data) {
    const { newsId } = data.origData
    const newsItem = this._stores.news.getItem(newsId)

    switch(type) {
      case LOAD + _COMMENTS + _START:
        newsItem.isLoadingComments = true
        newsItem.hasLoadedComments = false
        break

      case LOAD + _COMMENTS + _DONE:
        newsItem.isLoadingComments = false
        newsItem.hasLoadedComments = true
        data.response.forEach(this._addItem)
        break

      case LOAD + _COMMENTS + _FAIL:
        newsItem.isLoadingComments = false
        newsItem.hasLoadedComments = false
        break
    }

    this.change()
  }
}
