'use strict'

import React, { PropTypes } from 'react'
import NewsItem from 'components/NewsItem'
import { newsStore, commentStore } from 'stores'
import { loadAllNews } from 'actions/news'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.css'

const NewsList = React.createClass({
  childContextTypes: {
    lang: PropTypes.string
  },

  getChildContext() {
    return {
      lang: this.props.params.lang,
    }
  },

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
    newsStore.removeEventListener(this.change)
    commentStore.removeEventListener(this.change)
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
      const { id, lang } = this.props.params

      const linkTo = `/${lang}/news/${newsItem.id}`


      const shorterTitle = newsItem.title.substr(0, 80) + '...';

      return (
        <li key={newsItem.id}>
          <Link to={linkTo} activeClassName="active">{shorterTitle}</Link>
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
