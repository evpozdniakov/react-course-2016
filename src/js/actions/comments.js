import AppDispatcher from 'dispatcher'
import {MARK_AS_READ, LOAD, POST, DELETE, _COMMENT, _COMMENTS} from 'constants'
import { getRandomId } from 'utils'
import loadFromAPI from 'actions/api'

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

export function loadNewsComments(newsId) {
  loadFromAPI(`/api/comment/${newsId}`, LOAD + _COMMENTS, {newsId})
}