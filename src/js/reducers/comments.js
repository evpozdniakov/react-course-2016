import comments from 'fixtures/comments'
import { POST, _COMMENT } from 'constants'
import randomID from 'random-id'

export default (state = comments, action) => {
  const { data, type } = action

  switch (type) {
    case POST + _COMMENT:
      const { newsId, author, text } = data
      const id = randomID(20, '0')

      state.push({
        id,
        newsId,
        author,
        text,
      })

      console.log('--- randomID is', id);

      return state
  }

  return state
}
