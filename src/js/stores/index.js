import NewsStore from 'stores/newsStore'
import CommentStore from 'stores/commentStore'
import news from 'data/news'
import comments from 'data/comments'

const stores = {}

stores.news = new NewsStore(news, stores)
stores.comments = new CommentStore(comments, stores)

window.stores = stores

export const newsStore = stores.news
export const commentStore = stores.comments
