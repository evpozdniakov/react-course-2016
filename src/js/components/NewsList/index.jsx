'use strict'

import React from 'react'
import NewsItem from 'components/NewsItem'
import { newsStore, commentStore } from 'stores'
import { loadAllNews } from 'actions/news'
import { Link } from 'react-router'
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
      className: 'news-titles'
    }

    return (
      <div {...props}>
        {this.renderNewsTitles()}
      </div>
    )
  },

  renderNewsTitles() {
    const links = this.state.newsData.map(newsItem => {
      const linkTo = `/news/${newsItem.id}`

      return (
        <li key={newsItem.id}>
          <time>{newsItem.published}</time>
          <Link to={linkTo}>{newsItem.title}</Link>
        </li>
      )
    })

    return <ul>{links}</ul>
  },
})

export default NewsList
