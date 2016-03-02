import NewsStore from 'stores/newsStore'
import CommentStore from 'stores/commentStore'
import news from 'data/news'
import comments from 'data/comments'

const stores = {}

stores.newsStore = new NewsStore(news, stores)
stores.commentStore = new CommentStore(comments, stores)

export const newsStore = stores.newsStore
export const commentStore = stores.commentStore
