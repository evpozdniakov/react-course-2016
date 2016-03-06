import AppDispatcher from 'dispatcher'
import { MARK_NEWS_AS_READ, LOAD_ALL_NEWS } from 'constants'
import loadFromAPI from 'actions/api'

export const markNewsAsRead = (id) => {
  AppDispatcher.dispatch({
    type: MARK_NEWS_AS_READ,
    data: {id}
  })
}

export function loadAllNews() {
  loadFromAPI('/api/news', LOAD_ALL_NEWS)
}
