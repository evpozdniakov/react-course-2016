'use strict'

import React, {PropTypes} from 'react'
import Comment from 'components/Comment'
import addComment from 'HOC/addComment'
import {postComment, loadNewsComments} from 'actions/comments'
import './style.css'

const NewsComments = React.createClass({
  propTypes: {
    newsId: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })).isRequired,
    renderAddCommentUI: PropTypes.func.isRequired,
  },

  handlePostComment({author, text}) {
    const data = {
      newsId: this.props.newsId,
      author ,
      text
    }

    postComment(data)
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
      return <div className="loading">loading...</div>
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

export default addComment(NewsComments)
