import { combineReducers } from 'redux'
import news from 'reducers/news'
import comments from 'reducers/comments'

export default combineReducers({
  news,
  comments,
})
