'use strict'

import React, {PropTypes} from 'react'
import Comment from 'components/Comment'
import addComment from 'HOC/addComment'
import { postComment } from 'actions/comments'
import { connect } from 'react-redux'
import randomID from 'random-id'
import './style.css'

const CommentList = React.createClass({
  propTypes: {
    newsId: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })),
    renderAddCommentUI: PropTypes.func.isRequired,
    postComment: PropTypes.func.isRequired,
  },

  handlePostComment({author, text}) {
    const { newsId, postComment } = this.props
    const commentId = Number(randomID(20, '0'))

    postComment({commentId, newsId, author, text})
  },

  render() {
    const props = {
      className: 'comment-list-ctnr',
    }

    return (
      <div {...props}>
        {this.props.renderAddCommentUI(this.handlePostComment)}
        {this.renderCommentList()}
      </div>
    )
  },

  renderCommentList() {
    const { isLoading, comments } = this.props

    if (isLoading) {
      return <div className="loading">Loading...</div>
    }

    const commentElms = comments.map(comment => {
      const props = {
        key: comment.id,
        comment: comment
      }

      return <Comment {...props} />
    })

    const props = {
      className: 'comment-list'
    }

    return <div {...props}>{commentElms}</div>
  }
})

export default connect(state => {
  return {}
}, {
  postComment
})(addComment(CommentList))
