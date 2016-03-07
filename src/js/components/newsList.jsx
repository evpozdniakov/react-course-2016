'use strict'

import React from 'react'
import NewsItem from 'components/newsItem'
import {newsStore} from 'stores'
import {loadAllNews} from 'actions/news'

const NewsList = React.createClass({
  getInitialState() {
    return {
      newsData: newsStore.getAllUnread(),
      commentsShown: false,
    }
  },

  componentDidMount() {
    newsStore.addEventListener(this.change)
    loadAllNews()
  },

  componentWillUnmount() {
    newsStore.remveEventListener(this.change)
  },

  change() {
    this.setState({
      newsData: newsStore.getAllUnread()
    })
  },

  /*getToggleNewsContentHandler(id) {
    return () => {
      if (this.state.expandedItemId === id) {
        this.setState({expandedItemId: -1})
      }
      else {
        this.setState({expandedItemId: id})
      }

      this.setState({commentsShown: false})
    }
  },*/

  toggleNewsComments() {
    this.setState({commentsShown: !this.state.commentsShown})
  },

  render() {
    const items = this.state.newsData.map(newsItem => {
      newsItem.commentsShown = newsItem.isExpanded && this.state.commentsShown 

      const props = {
        key: newsItem.id,
        toggleNewsComments: this.toggleNewsComments,
        newsItem: newsItem,
      }

      return <NewsItem {...props} />
    })

    const props = {
      className: 'news-list-ctnr'
    }

    return <div {...props}>{items}</div>
  }
})

export default NewsList
