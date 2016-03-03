'use strict'

// import './style.css'
import React, {Component} from 'react'

export default OriginalComponent => {
  return class extends Component {
    constructor() {
      super()

      this.state = {
        isShown: false,
        text: ''
      }
    }

    toggleShowUI() {
      this.setState({isShown: !this.state.isShown})
    }

    handlePostComment() {
      this.callback(this.state.text)
      this.setState({
        isShown: false,
        text: '',
      })
    }

    handleChangeText(ev) {
      this.setState({text: ev.target.value})
    }

    renderAddCommentUI(callback) {
      this.callback = callback

      const props = {
        className: 'add-comment-ui'
      }

      return (
        <div {...props}>
          {this.renderToggleBtn()}
          {this.renderTextarea()}
          {this.renderPostBtn()}
        </div>
      )
    }

    renderToggleBtn() {
      const props = {
        className: 'toggle-btn',
        onClick: this.toggleShowUI.bind(this)
      }

      return <button {...props}>+ comment</button>
    }

    renderTextarea() {
      if (!this.state.isShown) {
        return null
      }

      const props = {
        onChange: this.handleChangeText.bind(this),
        value: this.state.text,
      }

      return <textarea {...props} />
    }

    renderPostBtn() {
      if (!this.state.isShown) {
        return null
      }

      const props = {
        className: 'post-btn',
        onClick: this.handlePostComment.bind(this)
      }

      return <button {...props}>Post</button>
    }

    render() {
      const props = {
        renderAddCommentUI: this.renderAddCommentUI.bind(this),
        ...this.props,
      }

      return (
        <OriginalComponent {...props} />
      )
    }
  }
}