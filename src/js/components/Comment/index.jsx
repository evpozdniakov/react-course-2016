'use strict'

import React, {PropTypes} from 'react'
import markAsRead from 'HOC/markAsRead'
import {deleteComment, markCommentAsRead} from 'actions/comments'
import './style.css'

const NewsComment = React.createClass({
  propTypes: {
    comment: PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    renderReadBtn: PropTypes.func.isRequired,
  },

  handleMarkAsRead() {
    markCommentAsRead(this.props.comment.id)
  },

  removeComment(ev) {
    ev.preventDefault()
    deleteComment(this.props.comment.id)
  },

  render() {
    const props = {
      className: 'comment',
    }

    return (
      <div {...props}>
        {this.props.renderReadBtn(this.handleMarkAsRead)}
        {this.renderAuthor()}
        {this.renderText()}
      </div>
    )
  },

  renderAuthor() {
    return (
      <div className="comment-author">
        {this.props.comment.author || '—incognito—'}
      </div>
    )
  },

  renderText() {
    return (
      <div className="comment-text">
        {this.props.comment.text}
      </div>
    )
  }
})

export default markAsRead(NewsComment)
