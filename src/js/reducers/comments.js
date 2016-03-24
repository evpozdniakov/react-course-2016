import comments from 'fixtures/comments'
import { POST, DELETE, _NEWS_ITEM, _COMMENT } from 'constants'

export default (state = comments, action) => {
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
  const { commentId:id, newsId, author, text } = data
  const newState = cloneState(state)
  //можно просто state.concat(...) 
  newState.push({
    id,
    newsId,
    author,
    text,
  })

  return newState
}

function handleDeleteNewsItem(state, data) {
  const { commentIds } = data
  const newState = cloneState(state).filter(item => !commentIds.includes(item.id))

  return newState
}
