import SimpleStore from 'stores/simpleStore'
import AppDispatcher from 'dispatcher'
import {DELETE_COMMENT} from 'constants'

export default class CommentStore extends SimpleStore {
  constructor(...args) {
    super(...args)

    AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case DELETE_COMMENT:
          this.deleteItem(data.id)
          this.change()
      }
    })
  }
}
