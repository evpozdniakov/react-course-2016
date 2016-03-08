'use strict'

import React, {PropTypes} from 'react'
import NewsComments from 'components/newsComments'
import timeSpent from 'HOC/timeSpent'
import markAsRead from 'HOC/markAsRead'
import { markNewsAsRead, toggleShowNewsItem } from 'actions/news'

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
    startCountTime: PropTypes.func.isRequired,
    stopCountTime: PropTypes.func.isRequired,
    renderTimeSpent: PropTypes.func.isRequired,
    renderReadBtn: PropTypes.func.isRequired,
  },

  handleMouseEnter() {
    this.props.startCountTime()
  },

  handleMouseLeave() {
    this.props.stopCountTime()
  },

  handleMarkAsRead() {
    markNewsAsRead(this.props.newsItem.id)
  },

  handleToggleNewsContent() {
    toggleShowNewsItem(this.props.newsItem.id)
  },

  render() {
    var className = 'news-item';

    if (!this.props.newsItem.isExpanded) {
      className += ' collapsed'
    }
    else if (this.props.newsItem.commentsShown) {
      className += ' with-comments'
    }

    const props = {
      className,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }

    return (
      <div {...props}>
        {this.props.renderTimeSpent()}
        {this.props.renderReadBtn(this.handleMarkAsRead)}
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
      onClick: this.handleToggleNewsContent
    }

    return (
      <div {...props}>
        <span>{title}</span>
      </div>
    )
  },

  renderContent() {
    return (
      <div className="news-content">
        {this.props.newsItem.content}
      </div>
    )
  },

  renderComments() {
    const props = {
      newsId: this.props.newsItem.id,
      comments: this.props.newsItem.getRelation('comments', {isRead: false}).reverse(),
      toggleNewsComments: this.props.toggleNewsComments
    }

    return <NewsComments {...props} />
  }
})

export default markAsRead(timeSpent(NewsItem))
