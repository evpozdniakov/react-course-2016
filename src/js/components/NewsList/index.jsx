'use strict'

import React from 'react'
import NewsItem from 'components/NewsItem'
import { newsStore, commentStore } from 'stores'
import { loadAllNews } from 'actions/news'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.css'

const NewsList = React.createClass({
  getInitialState() {
    return {
      newsData: newsStore.getAll(),
      commentsShown: false,
    }
  },

  componentDidMount() {
    newsStore.addEventListener(this.change)
    commentStore.addEventListener(this.change)
    loadAllNews()
  },

  componentWillUnmount() {
    newsStore.remveEventListener(this.change)
    commentStore.remveEventListener(this.change)
  },

  change() {
    this.setState({
      newsData: newsStore.getAll()
    })
  },

  render() {
    const props = {
      className: 'news-list-ctnr'
    }

    return (
      <div {...props}>
        {this.renderNewsItems()}
      </div>
    )
  },

  renderNewsItems() {
    return this.state.newsData.map(newsItem => {
      const props = {
        key: newsItem.id,
        transitionName: 'news-item',
        transitionEnterTimeout: 400,
        transitionLeaveTimeout: 200,
      }

      return (
        <ReactCSSTransitionGroup {...props}>
          {this.renderNewsItem(newsItem)}
        </ReactCSSTransitionGroup>
      )
    })
  },

  renderNewsItem(newsItem) {
    if (newsItem.isRead) {
      return null      
    }

    newsItem.commentsShown = newsItem.isExpanded && this.state.commentsShown 

    const props = {
      key: newsItem.id,
      newsItem: newsItem,
    }

    return <NewsItem {...props} />
  }
})

export default NewsList
