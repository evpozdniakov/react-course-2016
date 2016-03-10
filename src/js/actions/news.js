import AppDispatcher from 'dispatcher'
import { MARK_AS_READ, LOAD, TOGGLE_SHOW, _NEWS_ITEM, _ALL_NEWS } from 'constants'
import loadFromAPI from 'actions/api'

export function markNewsAsRead(id) {
  AppDispatcher.dispatch({
    type: MARK_AS_READ + _NEWS_ITEM,
    data: {id}
  })
}

export function loadAllNews() {
  loadFromAPI('/api/news', LOAD + _ALL_NEWS)
}

export function toggleShowNewsItem(id) {
  AppDispatcher.dispatch({
    type: TOGGLE_SHOW + _NEWS_ITEM,
    data: {id}
  })
}

export function loadNewsItem(id) {
  loadFromAPI(`/api/news/${id}`, LOAD + _NEWS_ITEM, {id})
}
