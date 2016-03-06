import NewsStore from 'stores/newsStore'
import CommentStore from 'stores/commentStore'

const stores = {}

stores.news = new NewsStore(stores)
stores.comments = new CommentStore(stores)

window.stores = stores

export const newsStore = stores.news
export const commentStore = stores.comments
