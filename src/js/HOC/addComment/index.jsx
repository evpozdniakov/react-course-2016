'use strict'

import './style.css'
import React, {Component} from 'react'

export default OriginalComponent => {
  return class extends Component {
    constructor() {
      super()

      this.state = {
        isShown: false,
        text: '',
        author: '',
      }
    }

    toggleShowUI() {
      this.setState({isShown: !this.state.isShown})
    }

    handlePostComment() {
      if (!this.state.text) {
        alert('Text missing') // FIXME
        return
      }

      this.callback({
        author: this.state.author,
        text: this.state.text,
      })

      this.setState({
        isShown: false,
        text: '',
      })
    }

    handleChangeAuthor(ev) {
      this.setState({author: ev.target.value})
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
          {this.renderInputAuthor()}
          {this.renderInputText()}
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

    renderInputAuthor() {
      if (!this.state.isShown) {
        return null
      }

      const props = {
        className: 'input author',
        placeholder: 'your name',
        onChange: this.handleChangeAuthor.bind(this),
        value: this.state.author,
      }

      return <input {...props} />
    }

    renderInputText() {
      if (!this.state.isShown) {
        return null
      }

      const props = {
        className: 'input text',
        placeholder: 'your comment',
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