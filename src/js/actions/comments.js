import { POST, _COMMENT } from 'constants'

export function postComment(data) {
  return {
    type: POST + _COMMENT,
    data: data,
  }
}
