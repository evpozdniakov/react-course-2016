import comments from 'fixtures/comments'
import { POST, _COMMENT } from 'constants'

export default (state = comments, action) => {
  const { data, type } = action

  switch (type) {
    case POST + _COMMENT:
      const { commentId:id, newsId, author, text } = data

      state.push({
        id,
        newsId,
        author,
        text,
      })

      return state
  }

  return state
}
