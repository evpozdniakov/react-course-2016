import React from 'react'
import NewsComments from 'components/newsComments'
import hasMouse from 'HOC/hasMouse'

const NewsItem = React.createClass({
  propTypes: {
    newsItem: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      published: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
      comments: React.PropTypes.array.isRequired,
      isExpanded: React.PropTypes.bool.isRequired,
      commentsShown: React.PropTypes.bool.isRequired
    }).isRequired,
    toggleNewsContent: React.PropTypes.func.isRequired,
    toggleNewsComments: React.PropTypes.func.isRequired,
    mouseEnter: React.PropTypes.func.isRequired,
    mouseLeave: React.PropTypes.func.isRequired,
    calcClassName: React.PropTypes.func.isRequired,
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
      className: this.props.calcClassName(className),
      onMouseEnter: this.props.mouseEnter,
      onMouseLeave: this.props.mouseLeave,
    }

    return (
      <div {...props}>
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
      onClick: this.props.toggleNewsContent
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
      comments: this.props.newsItem.comments,
      toggleNewsComments: this.props.toggleNewsComments
    }

    return <NewsComments {...props} />
  }
})

export default hasMouse(NewsItem)
