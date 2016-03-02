'use strict'

import './style.css'
import React, {Component} from 'react'

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
          Mark as read
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