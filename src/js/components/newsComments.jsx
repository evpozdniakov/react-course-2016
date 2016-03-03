'use strict'

import React, {PropTypes} from 'react'
import NewsComment from 'components/newsComment'
import addComment from 'HOC/addComment'
// import {POST_COMMENT} from 'actions/comments'

const NewsComments = React.createClass({
  propTypes: {
    toggleNewsComments: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })).isRequired,
    renderAddCommentUI: PropTypes.func.isRequired,
  },

  handlePostComment(comment) {
    console.log('--- post new comment: ', comment);
  },

  render() {
    const props = {
      className: 'news-comments',
    }

    return (
      <div {...props}>
        {this.renderToggle()}
        {this.props.renderAddCommentUI(this.handlePostComment)}
        {this.renderList()}
      </div>
    )
  },

  renderToggle() {
    const props = {
      className: 'comments-toggle',
      onClick: this.props.toggleNewsComments
    }

    return (
      <div {...props}>
        Комментариев: {this.props.comments.length}
      </div>
    )
  },

  renderList() {
    const commentElms = this.props.comments.map(comment => {
      const props = {
        key: comment.id,
        comment: comment
      }

      return <NewsComment {...props} />
    })

    const props = {
      className: 'comment-list'
    }

    return <div {...props}>{commentElms}</div>
  }
})

export default addComment(NewsComments)