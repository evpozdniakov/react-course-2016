'use strict'

import React, {PropTypes} from 'react'
import CommentList from 'components/CommentList'
import { markNewsAsRead, toggleShowNewsItem, loadNewsItem } from 'actions/news'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.css'

const NewsItem = React.createClass({
  propTypes: {
    newsItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      published: PropTypes.string.isRequired,
      content: PropTypes.string,
      comments: PropTypes.array.isRequired,
      isExpanded: PropTypes.bool.isRequired,
      commentsShown: PropTypes.bool.isRequired,
      isLoading: PropTypes.bool,
      isLoaded: PropTypes.bool,
    }).isRequired,
  },

  shouldComponentUpdate(nextProps) {
    const {id, content, isLoaded, isLoading, isExpanded} = nextProps.newsItem

    if (isExpanded && !content && !isLoading && !isLoaded) {
      loadNewsItem(id)
      return false
    }

    return true
  },

  handleMarkAsRead() {
    markNewsAsRead(this.props.newsItem.id)
  },

  handleToggleNewsContent() {
    toggleShowNewsItem(this.props.newsItem.id)
  },

  render() {
    const className = 'news-item' + (this.props.newsItem.isExpanded ? ' expanded' : '')
 
    const props = {
      className,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }

    return (
      <div {...props}>
        {this.renderDate()}
        {this.renderTitle()}
        {this.renderContentTransition()}
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
      onClick: this.handleToggleNewsContent
    }

    return (
      <div {...props}>
        <span>{title}</span>
      </div>
    )
  },

  renderContentTransition() {
    const props = {
      transitionName: 'news-content-comments',
      transitionEnterTimeout: 400,
      transitionLeaveTimeout: 200
    }

    return (
      <ReactCSSTransitionGroup {...props}>
        {this.renderContentAndComments()}
      </ReactCSSTransitionGroup>
    )
  },

  renderContentAndComments() {
    if (!this.props.newsItem.isExpanded) {
      return null
    }

    const props = {
      key: 'news-content-comments',
      className: 'news-content-comments',
    }

    return (
      <div {...props}>
        {this.renderContent()}
        {this.renderComments()}
      </div>
    )
  },

  renderContent() {
    const { content, isLoading } = this.props.newsItem

    if (isLoading) {
      return <div className="loading">loading...</div>
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
    const { id, isLoadingComments, isLoadedComments, comments, getRelation } = this.props.newsItem

    const props = {
      key: 'comments',
      newsId: id,
      isLoading: isLoadingComments,
      isLoaded: isLoadedComments,
      commentCount: comments.length,
      comments: getRelation('comments', {isRead: false}).reverse(),
    }

    return <CommentList {...props} />
  }
})

export default NewsItem
