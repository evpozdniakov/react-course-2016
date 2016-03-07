import AppDispatcher from 'dispatcher'
import { MARK_NEWS_AS_READ, LOAD_ALL_NEWS, TOGGLE_SHOW_NEWS_ITEM } from 'constants'
import loadFromAPI from 'actions/api'

export function markNewsAsRead(id) {
  AppDispatcher.dispatch({
    type: MARK_NEWS_AS_READ,
    data: {id}
  })
}

export function loadAllNews() {
  loadFromAPI('/api/news', LOAD_ALL_NEWS)
}

export function toggleShowNewsItem(id) {
  AppDispatcher.dispatch({
    type: TOGGLE_SHOW_NEWS_ITEM,
    data: {id}
  })
}