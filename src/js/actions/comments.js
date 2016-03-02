import AppDispatcher from 'dispatcher'
import {DELETE_COMMENT} from 'constants'

export const deleteComment = (id) => {
  AppDispatcher.dispatch({
    type: DELETE_COMMENT,
    data: {id}
  })
}
