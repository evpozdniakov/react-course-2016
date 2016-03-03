import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import {MARK_COMMENT_AS_READ, DELETE_COMMENT} from 'constants'

export default class CommentStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_COMMENT_AS_READ:
          this.markAsRead(data.id)
          this.change()
          break

        case DELETE_COMMENT:
          this.deleteItem(data.id)
          this.change()
          break
      }
    })
  }
}
