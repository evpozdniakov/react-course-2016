import AppDispatcher from 'dispatcher'
import {MARK_NEWS_AS_READ} from 'constants'

export const markNewsAsRead = (id) => {
  AppDispatcher.dispatch({
    type: MARK_NEWS_AS_READ,
    data: {id}
  })
}
