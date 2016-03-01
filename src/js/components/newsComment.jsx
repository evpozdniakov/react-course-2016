import React, {PropTypes} from 'react'
import timeSpent from 'HOC/timeSpent'

const NewsComment = React.createClass({
  propTypes: {
    comment: PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    mlsSpent: PropTypes.number,
  },

  render() {
    const props = {
      className: 'news-comment',
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
    }

    return (
      <div {...props}>
        {this.renderAuthor()}
        {this.renderText()}
        {this.renderTimeSpent()}
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
  },

  renderTimeSpent() {
    return <span className="time-spent">{this.props.mlsSpent}</span>
  }
})

export default timeSpent(NewsComment)
