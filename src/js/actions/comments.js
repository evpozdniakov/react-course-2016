import { POST, _COMMENT } from 'constants'
import randomID from 'random-id'

export function postComment(data) {
  const commentId = Number(randomID(15, '0'))

  return {
    type: POST + _COMMENT,
    data: {
	    ...data,
	    commentId
	  },
  }
}
