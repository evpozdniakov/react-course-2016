import { POST, DELETE, _NEWS_ITEM, _COMMENT } from 'constants'

export function postComment(data) {
  return {
    type: POST + _COMMENT,
    data: data,
  }
}

export function deleteNewsItem(data) {
  return {
    type: DELETE + _NEWS_ITEM,
    data: data,
  }
}
