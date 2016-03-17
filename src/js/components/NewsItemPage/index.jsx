import React, { Component, PropTypes } from 'react'
import NewsItem from 'components/NewsItem'
import { newsStore } from 'stores'

export default class NewsItemPage extends Component {
  static propTypes = {}

  constructor(props) {
    super()

    this.state = {
      newsItem: null
    }

    this.requestNewsItem(props)
  }

  componentDidMount() {
    newsStore.addEventListener(this.change)
  }

  componentWillUnmount() {
    newsStore.removeEventListener(this.change)
  }

  componentWillReceiveProps(props) {
    this.requestNewsItem(props)
  }

  change = () => {
    const { id } = this.props.params
    const newsItem = newsStore.getItem(id)

    this.setState({newsItem})
  }

  requestNewsItem(props) {
    const { id } = props.params

    setTimeout(() => {
      this.setState({
        newsItem: newsStore.getOrLoadNewsItem(id)
      })
    }, 0)
  }

  render() {
    var { newsItem } = this.state

    if (!newsItem) {
      const { id } = this.props.params
      newsItem = newsStore.getItem(id)      
    }

    if (!newsItem) {
      return null
    }

    newsItem.isExpanded = true
    newsItem.commentsShown = false

    const props = {
      newsItem
    }

    return (
      <NewsItem {...props} />
    )
  }
}
