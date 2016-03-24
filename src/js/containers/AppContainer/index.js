import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NewsItem from 'components/NewsItem'

class AppContainer extends Component {
  static propTypes = {
    news: PropTypes.array,
  }

  render() {
    const { news } = this.props

    const newsItems = news.map(data => {
      return <NewsItem key={data.id} newsItem={data} />
    })

    return (
      <div>
        {newsItems}
      </div>
    )
  }
}

export default connect(state => {
  const { news } = state
  return {news}
})(AppContainer)
