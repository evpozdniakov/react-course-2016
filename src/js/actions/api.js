import AppDispatcher from 'dispatcher'
import { _START, _DONE, _FAIL } from 'constants'
import $ from 'jquery'

export default function loadFromAPI(url, base_type, origData = null) {
  AppDispatcher.dispatch({
    type: base_type + _START,
    data: {origData},
  })

  setTimeout(function() {
    $.get(url)
      .done(response => {
        AppDispatcher.dispatch({
          type: base_type + _DONE,
          data: {response, origData},
        })
      })
      .fail((jqXHR, textStatus, error) => {
        AppDispatcher.dispatch({
          type: base_type + _FAIL,
          data: {error, origData},
        })
      })
  }, 500)
}
