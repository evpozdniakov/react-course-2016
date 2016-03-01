'use strict'

import React, {PropTypes} from 'react'
import timeSpent from 'mixins/timeSpent'
import hintInfo from 'mixins/hintInfo'

const NewsComment = React.createClass({
  mixins: [hintInfo, timeSpent],

  propTypes: {
    comment: PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  },

  getHintInfo() {
    return `Тип: комментарий\nid:${this.props.comment.id}`
  },

  handleMouseEnter() {
    this.startCountTime()
    this.showHintInfo(this.getHintInfo())
  },

  handleMouseLeave() {
    this.stopCountTime()
    this.hideHintInfo()
  },

  render() {
    const props = {
      className: 'news-comment',
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }

    return (
      <div {...props}>
        {this.renderAuthor()}
        {this.renderText()}
        {this.renderTimeSpent()}
      </div>
    )
  },

  renderAuthor() {
    return (
      <div className="comment-author">
        {this.props.comment.author}
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

export default NewsComment
