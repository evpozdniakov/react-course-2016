import AppDispatcher from 'dispatcher'

export const markNewsAsRead = (id) => {
  AppDispatcher.dispatch({
    type: 'MARK_NEWS_AS_READ',
    data: {id}
  })
}
