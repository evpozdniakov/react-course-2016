import AppDispatcher from 'dispatcher'
import {MARK_COMMENT_AS_READ, POST_COMMENT, DELETE_COMMENT} from 'constants'
import { getRandomId } from 'utils'

export const markCommentAsRead = (id) => {
  AppDispatcher.dispatch({
    type: MARK_COMMENT_AS_READ,
    data: {id},
  })
}

export const postComment = ({newsId, author, text}) => {
  if (!text || !newsId) {
    return
  }

  const commentId = getRandomId()

  AppDispatcher.dispatch({
    type: POST_COMMENT,
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
    type: DELETE_COMMENT,
    data: {id},
  })
}
