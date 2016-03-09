import NewsStore from 'stores/news'
import CommentStore from 'stores/comments'

const stores = {}

stores.news = new NewsStore(stores)
stores.comments = new CommentStore(stores)

window.stores = stores

export const newsStore = stores.news
export const commentStore = stores.comments
