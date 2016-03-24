import { DELETE, _NEWS_ITEM } from 'constants'
import store from 'store'

export function deleteNewsItem(data) {
	const { newsId } = data
	const commentIds = store.getState().news
		.filter(item => item.id === newsId)[0]
		.comments

  return {
    type: DELETE + _NEWS_ITEM,
    data: {
    	newsId,
    	commentIds
    },
  }
}
