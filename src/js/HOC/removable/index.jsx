'use strict'

import './style.css'
import React, {Component} from 'react'
import { i18n } from 'i18n'

export default OriginalComponent => {
  return class extends Component {
    renderDeleteBtn(callback) {
      const props = {
         className: 'delete-btn',
         onClick: callback,
      }

      return (
        <button {...props}>
          {i18n('Delete')}
        </button>
      )
    }

    render() {
      const props = {
        renderDeleteBtn: this.renderDeleteBtn,
        ...this.props
      }

      return (
        <OriginalComponent {...props} />
      )
    }
  }
}
