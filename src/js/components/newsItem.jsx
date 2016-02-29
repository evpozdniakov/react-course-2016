import React from 'react'
import NewsComments from 'components/newsComments'

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
  },

  handleTitleClick: function(ev) {
    this.props.toggleNewsContent(ev, {id: this.props.newsItem.id})
  },

  handleCommentsClick: function() {
    this.props.toggleNewsComments()
  },

  render: function() {
    var className = 'news-item';

    if (!this.props.newsItem.isExpanded) {
      className += ' collapsed'
    }
    else if (this.props.newsItem.commentsShown) {
      className += ' with-comments'
    }

    return (
      <div className={className}>
        {this.renderDate()}
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderComments()}
      </div>
    )
  },

  renderDate: function() {
    return (
      <div className="news-date">
        {this.props.newsItem.published}
      </div>
    )
  },

  renderTitle: function() {
    const title = React.createElement('span', {}, this.props.newsItem.title);
    const props = {
      className: 'news-title',
      onClick: this.handleTitleClick
    }

    return <div {...props}>{title}</div>
  },

  renderContent: function() {
    return (
      <div className="news-content">
        {this.props.newsItem.content}
      </div>
    )
  },

  renderComments: function() {
    const props = {
      comments: this.props.newsItem.comments,
      toggleNewsComments: this.handleCommentsClick
    }

    return <NewsComments {...props} />
  }
})

export default NewsItem
