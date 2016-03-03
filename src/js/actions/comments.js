import AppDispatcher from 'dispatcher'
import {MARK_COMMENT_AS_READ, POST_COMMENT, DELETE_COMMENT} from 'constants'

export const markCommentAsRead = (id) => {
  AppDispatcher.dispatch({
    type: MARK_COMMENT_AS_READ,
    data: {id},
  })
}

export const postComment = ({newsId, author, text}) => {
  AppDispatcher.dispatch({
    type: POST_COMMENT,
    data: {newsId, author, text},
  })
}

export const deleteComment = (id) => {
  AppDispatcher.dispatch({
    type: DELETE_COMMENT,
    data: {id},
  })
}
