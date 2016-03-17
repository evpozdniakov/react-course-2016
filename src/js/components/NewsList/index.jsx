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
        {this.renderCurrentNewsItem()}
      </div>
    )
  },

  renderNewsTitles() {
    const links = this.state.newsData.map(newsItem => {
      const linkTo = `/news/${newsItem.id}`

      const { id } = this.props.params

      const shorterTitle = newsItem.title.substr(0, 80) + '...';

      return (
        <li key={newsItem.id}>
          <Link to={linkTo}>{shorterTitle}</Link>
        </li>
      )
    })

    return <ul>{links}</ul>
  },

  renderCurrentNewsItem() {
    if (!newsStore.hasData) {
      return null
    }

    return this.props.children
  }
})

export default NewsList
