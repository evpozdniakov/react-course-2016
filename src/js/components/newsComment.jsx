'use strict'

import React, {PropTypes} from 'react'
import timeSpent from 'HOC/timeSpent'
import hintInfo from 'HOC/hintInfo'
import markAsRead from 'HOC/markAsRead'
import {deleteComment, markCommentAsRead} from 'actions/comments'

const NewsComment = React.createClass({
  propTypes: {
    comment: PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    startCountTime: PropTypes.func.isRequired,
    stopCountTime: PropTypes.func.isRequired,
    renderTimeSpent: PropTypes.func.isRequired,
    showHintInfo: PropTypes.func.isRequired,
    hideHintInfo: PropTypes.func.isRequired,
    renderReadBtn: PropTypes.func.isRequired,
  },

  getHintInfo() {
    return `Тип: комментарий\nid:${this.props.comment.id}`
  },

  handleMouseEnter() {
    this.props.startCountTime()
    this.props.showHintInfo(this.getHintInfo())
  },

  handleMouseLeave() {
    this.props.stopCountTime()
    this.props.hideHintInfo()
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
      className: 'news-comment',
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }

    return (
      <div {...props}>
        {this.props.renderTimeSpent()}
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

export default markAsRead(timeSpent(hintInfo(NewsComment)))
