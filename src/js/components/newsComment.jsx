import React, {PropTypes} from 'react'
import timeSpent from 'HOC/timeSpent'
import hintInfo from 'HOC/hintInfo'

const NewsComment = React.createClass({
  propTypes: {
    comment: PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    startCountTime: PropTypes.func.isRequired,
    stopCountTime: PropTypes.func.isRequired,
    renderTimeSpent: PropTypes.func.isRequired,
    showHintInfo: PropTypes.func.isRequired,
    hideHintInfo: PropTypes.func.isRequired,
  },

  getHintInfo() {
    return `Тип: комментарий\nid:${this.props.comment.id}`
  },

  handleMouseEnter() {
    this.props.startCountTime()
    this.props.showHintInfo(this.getHintInfo())
  },

  handleMouseLeave() {
    this.props.stopCountTime()
    this.props.hideHintInfo()
  },

  render() {
    const props = {
      className: 'news-comment',
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }

    return (
      <div {...props}>
        {this.renderAuthor()}
        {this.renderText()}
        {this.props.renderTimeSpent()}
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

export default timeSpent(hintInfo(NewsComment))
