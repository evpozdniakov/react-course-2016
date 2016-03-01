import React from 'react'
import hasMouse from 'HOC/hasMouse'

const NewsComment = React.createClass({
  propTypes: {
    comment: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }),
    mouseEnter: React.PropTypes.func.isRequired,
    mouseLeave: React.PropTypes.func.isRequired,
    calcClassName: React.PropTypes.func.isRequired,
  },

  render() {
    const props = {
      className: this.props.calcClassName('news-comment'),
      onMouseEnter: this.props.mouseEnter,
      onMouseLeave: this.props.mouseLeave,
    }
    return (
      <div {...props}>
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

export default hasMouse(NewsComment)
