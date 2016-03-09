'use strict'

import React, {PropTypes} from 'react'
import CommentList from 'components/CommentList'
import markAsRead from 'HOC/markAsRead'
import { markNewsAsRead, toggleShowNewsItem } from 'actions/news'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.css'

const NewsItem = React.createClass({
  propTypes: {
    newsItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      published: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      comments: PropTypes.array.isRequired,
      isExpanded: PropTypes.bool.isRequired,
      commentsShown: PropTypes.bool.isRequired
    }).isRequired,
    toggleNewsComments: PropTypes.func.isRequired,
    renderReadBtn: PropTypes.func.isRequired,
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
        {this.props.renderReadBtn(this.handleMarkAsRead)}
        {this.renderDate()}
        {this.renderTitle()}
        {this.renderTransitionGroup()}
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

  renderTransitionGroup() {
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
    const props = {
      key: 'news-content',
      className: 'news-content',
    }

    return (
      <div {...props}>
        {this.props.newsItem.content}
      </div>
    )
  },

  renderComments() {
    const props = {
      key: 'comments',
      newsId: this.props.newsItem.id,
      comments: this.props.newsItem.getRelation('comments', {isRead: false}).reverse(),
      toggleNewsComments: this.props.toggleNewsComments
    }

    return <CommentList {...props} />
  }
})

export default markAsRead(NewsItem)
