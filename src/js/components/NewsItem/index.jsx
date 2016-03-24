'use strict'

import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { getRelation } from 'utils'
import CommentList from 'components/CommentList'
import './style.css'

const NewsItem = React.createClass({
  propTypes: {
    newsItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      published: PropTypes.string.isRequired,
      content: PropTypes.string,
      comments: PropTypes.arrayOf(PropTypes.number),
      isLoading: PropTypes.bool,
      isLoaded: PropTypes.bool,
    }).isRequired,
    comments: PropTypes.array,
  },

  render() {
    const className = 'news-item'
 
    const props = {
      className,
    }

    return (
      <div {...props}>
        {this.renderDate()}
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderComments()}
      </div>
    )
  },

  renderDate() {
    return (
      <div className="news-date">
        {this.props.newsItem.published}
      </div>
    )
  },

  renderTitle() {
    const {id, title} = this.props.newsItem;

    const props = {
      className: 'news-title',
    }

    return (
      <div {...props}>
        <span>{title}</span>
      </div>
    )
  },

  renderContent() {
    const { content, isLoading } = this.props.newsItem

    if (isLoading) {
      return <div className="loading">Loading...</div>
    }

    const props = {
      key: 'news-content',
      className: 'news-content',
    }

    return (
      <div {...props}>
        {content}
      </div>
    )
  },

  renderComments() {
    const { newsItem } = this.props
    const comments = getRelation(newsItem, 'comments')

    const props = {
      newsId: newsItem.id,
      comments
    }

    return <CommentList {...props} />
  }
})

export default connect(state => {
  const { comments } = state
  return {comments}
})(NewsItem)
