'use strict'

import React, {PropTypes} from 'react'
import Comment from 'components/Comment'
import addComment from 'HOC/addComment'
import {postComment, loadNewsComments} from 'actions/comments'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.css'

const NewsComments = React.createClass({
  propTypes: {
    newsId: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })).isRequired,
    renderAddCommentUI: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      isExpanded: false
    }
  },

  //ОООчень плохой выбор, shouldComponentUpdate не должно ничего менять, только решать обновляться ли компоненту. И тут незачем
  shouldComponentUpdate(nextProps, nextState) {
    const { isExpanded } = nextState
    const { commentCount, newsId, isLoaded, isLoading } = nextProps

    if (isExpanded && commentCount > 0 && !isLoaded && !isLoading) {
      loadNewsComments(newsId)
      return false
    }

    return true
  },

  handlePostComment({author, text}) {
    const data = {
      newsId: this.props.newsId,
      author ,
      text
    }

    postComment(data)
  },

  handleToggleComments() {
    const { isExpanded } = this.state;
    this.setState({isExpanded: !isExpanded})
  },

  render() {
    const props = {
      className: 'comment-list-ctnr',
    }

    return (
      <div {...props}>
        {this.props.renderAddCommentUI(this.handlePostComment)}
        {this.renderToggleList()}
        {this.renderListTransition()}
      </div>
    )
  },

  renderToggleList() {
    const { commentCount, comments, isLoaded } = this.props

    const displayCommentCount = isLoaded ? comments.length : commentCount

    const props = {
      className: 'comments-toggle' + (displayCommentCount > 0 ? ' clickable' : ''),
      onClick: this.handleToggleComments,
    }

    return (
      <div {...props}>
        Комментариев: {displayCommentCount}
      </div>
    )
  },

  renderListTransition() {
    const props = {
      transitionName: 'comment-list',
      transitionEnterTimeout: 400,
      transitionLeaveTimeout: 200,
    }

    return (
      <ReactCSSTransitionGroup {...props}>
        {this.renderList()}
      </ReactCSSTransitionGroup>
    )
  },

  renderList() {
    const { isExpanded } = this.state

    if (!this.state.isExpanded) {
      return null
    }

    const { isLoading, comments } = this.props

    if (isLoading) {
      return <div className="loading">loading...</div>
    }

    const commentElms = comments.map(comment => {
      const props = {
        key: comment.id,
        comment: comment
      }

      return <Comment {...props} />
    })

    const props = {
      className: 'comment-list'
    }

    return <div {...props}>{commentElms}</div>
  }
})

export default addComment(NewsComments)
