import AppDispatcher from 'dispatcher'
import { _START, _DONE, _FAIL } from 'constants'
import $ from 'jquery'

export default function loadFromAPI(url, base_type) {
  AppDispatcher.dispatch({
    type: base_type + _START,
    data: null,
  })

  $.get(url)
    .done(response => {
      AppDispatcher.dispatch({
        type: base_type + _DONE,
        data: {response},
      })
    })
    .fail((jqXHR, textStatus, error) => {
      AppDispatcher.dispatch({
        type: base_type + _FAIL,
        data: {error},
      })
    })
}
