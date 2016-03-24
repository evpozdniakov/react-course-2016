import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NewsItem from 'components/NewsItem'

class AppContainer extends Component {
  static propTypes = {
    news: PropTypes.array,
  }

  render() {
    console.log('---render AppContainer');
    const { news } = this.props

    const newsItems = news.map(data => {
      // так не работает
      // return <NewsItem key={data.id} newsItem={data} />

      const date = new Date().getTime()
      return (
        <NewsItem key={data.id} newsItem={data}>
          {date}
        </NewsItem>
      )
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
