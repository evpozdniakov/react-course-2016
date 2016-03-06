import { LOAD_ALL_NEWS_START, LOAD_ALL_NEWS_SUCCESS, LOAD_ALL_NEWS_FAIL } from 'constants'
import AppDispatcher from 'dispatcher'
import $ from 'jquery'

export function loadAllNews() {
  AppDispatcher.dispatch({
    type: LOAD_ALL_NEWS_START,
    data: null,
  })

  $.get('/api/news')
    .done(news => {
      AppDispatcher.dispatch({
        type: LOAD_ALL_NEWS_SUCCESS,
        data: {news},
      })
    })
    .fail((jqXHR, textStatus, error) => {
      AppDispatcher.dispatch({
        type: LOAD_ALL_NEWS_FAIL,
        data: {error},
      })
    })
}