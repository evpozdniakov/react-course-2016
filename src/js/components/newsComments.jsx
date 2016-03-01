'use strict'

import React from 'react'
import NewsComment from 'components/newsComment'

const NewsComments = React.createClass({
  propTypes: {
    toggleNewsComments: React.PropTypes.func.isRequired,
    comments: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired
    })).isRequired
  },

  render() {
    if (this.props.comments.length === 0) {
      return null      
    }

    const props = {
      className: 'news-comments',
    }

    return (
      <div {...props}>
        {this.renderToggle()}
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

export default NewsComments