'use strict'

import React, {PropTypes} from 'react'
import { markNewsAsRead, toggleShowNewsItem, loadNewsItem } from 'actions/news'
import { i18n } from 'i18n'
import './style.css'

const NewsItem = React.createClass({
  propTypes: {
    newsItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      published: PropTypes.string.isRequired,
      content: PropTypes.string,
      isLoading: PropTypes.bool,
      isLoaded: PropTypes.bool,
    }).isRequired,
  },

  shouldComponentUpdate(nextProps) {
    const {id, content, isLoaded, isLoading} = nextProps.newsItem

    if (!content && !isLoading && !isLoaded) {
      loadNewsItem(id)
      return false
    }

    return true
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
      return <div className="loading">{i18n('Loading...')}</div>
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
})

export default NewsItem
