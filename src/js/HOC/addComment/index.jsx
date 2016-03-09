'use strict'

import './style.css'
import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
          {this.renderTransitionGroup()}
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

    renderTransitionGroup() {
      const props = {
        transitionName: 'add-comment-ui',
        transitionEnterTimeout: 400,
        transitionLeaveTimeout: 200,
      }

      return (
        <ReactCSSTransitionGroup {...props}>
          {this.renderInputAuthor()}
          {this.renderInputText()}
          {this.renderPostBtn()}
        </ReactCSSTransitionGroup>
      )
    }

    renderInputAuthor() {
      if (!this.state.isShown) {
        return null
      }

      const props = {
        key: 'input-author',
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
        key: 'input-text',
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
        key: 'post-btn',
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