import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import {MARK_AS_READ, POST, DELETE, _COMMENT} from 'constants'

export default class CommentStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    this.dispatchToken = AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_AS_READ + _COMMENT:
          this.markAsRead(data.id)
          this.change()
          break

        case POST + _COMMENT:
          let { commentId, author, text, isRead } = data

          this.addItem({
            id: commentId,
            author,
            text,
            isRead,
          })

          break

        case DELETE + _COMMENT:
          this.deleteItem(data.id)
          this.change()
          break
      }
    })
  }
}
