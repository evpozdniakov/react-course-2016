import news from 'fixtures/news'
import { POST, _COMMENT } from 'constants'

export default (state = news, action) => {
  const { data, type } = action

  switch (type) {
    case POST + _COMMENT:
      const { commentId, newsId } = data
      const newState = state.slice()
      const newsItem = newState.filter(item => item.id === newsId)[0]

      newsItem.comments.push(commentId)

      return newState
  }

  return state
}
