import React from 'react'

const NewsComment = React.createClass({
  propTypes: {
    comment: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired      
    })
  },

  render() {
    return (
      <div className="news-comment">
        {this.renderAuthor()}
        {this.renderText()}
      </div>
    )
  },

  renderAuthor() {
    return (
      <div className="comment-author">
        {this.props.comment.author}
      </div>
    )
  },

  renderText() {
    return (
      <div className="comment-text">
        {this.props.comment.text}
      </div>
    )
  }
})

export default NewsComment