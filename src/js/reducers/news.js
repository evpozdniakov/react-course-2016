import news from 'fixtures/news'
import { POST, DELETE, _NEWS_ITEM, _COMMENT } from 'constants'

export default (state = news, action) => {
  const { data, type } = action

  switch (type) {
    case POST + _COMMENT:
      return handlePostComment(state, data)

    case DELETE + _NEWS_ITEM:
      return handleDeleteNewsItem(state, data)
  }

  return state
}

function cloneState(state) {
  return state.map(item => Object.assign({}, item))
}

function handlePostComment(state, data) {
  const { commentId, newsId } = data
  const newState = cloneState(state)
  const newsItem = newState.filter(item => item.id === newsId)[0]

  newsItem.comments.unshift(commentId)

  return newState
}

function handleDeleteNewsItem(state, data) {
  const { newsId } = data
  const newState = cloneState(state).filter(item => item.id != newsId)

  return newState
}
