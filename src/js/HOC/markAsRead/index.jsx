'use strict'

import './style.css'
import React, {Component} from 'react'
import { i18n } from 'i18n'

export default OriginalComponent => {
  return class extends Component {
    handleRead() {
      this.setState({isRead: true})
    }

    renderReadBtn(callback) {
      const props = {
         className: 'mark-as-read-btn',
         onClick: callback,
      }

      return (
        <button {...props}>
          {i18n('Mark_as_read')}
        </button>
      )
    }

    render() {
      const props = {
        renderReadBtn: this.renderReadBtn,
        ...this.props
      }

      return (
        <OriginalComponent {...props} />
      )
    }
  }
}