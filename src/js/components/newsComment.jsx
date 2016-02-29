import React from 'react'

const NewsComment = React.createClass({
  propTypes: {
    comment: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired      
    })
  },

  render: function() {
    return React.createElement('div', {className: 'news-comment'},
      this.renderAuthor(),
      this.renderText()
    )
  },

  renderAuthor: function() {
    return React.createElement('div', {className: 'comment-author'}, this.props.comment.author)
  },

  renderText: function() {
    return React.createElement('div', {className: 'comment-text'}, this.props.comment.text)
  }
})

export default NewsComment