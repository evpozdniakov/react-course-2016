import AppDispatcher from 'dispatcher'

export const deleteComment = (id) => {
  AppDispatcher.dispatch({
    type: 'DELETE_COMMENT',
    data: {id}
  })
}
