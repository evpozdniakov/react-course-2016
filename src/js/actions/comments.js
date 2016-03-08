import AppDispatcher from 'dispatcher'
import {MARK_AS_READ, POST, DELETE, _COMMENT} from 'constants'
import { getRandomId } from 'utils'

export const markCommentAsRead = (id) => {
  AppDispatcher.dispatch({
    type: MARK_AS_READ + _COMMENT,
    data: {id},
  })
}

export const postComment = ({newsId, author, text}) => {
  if (!text || !newsId) {
    return
  }

  const commentId = getRandomId()

  AppDispatcher.dispatch({
    type: POST + _COMMENT,
    data: {
      commentId,
      newsId,
      author,
      text,
      isRead: false,
    },
  })
}

export const deleteComment = (id) => {
  AppDispatcher.dispatch({
    type: DELETE + _COMMENT,
    data: {id},
  })
}
