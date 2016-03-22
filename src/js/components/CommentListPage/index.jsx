import React, { Component, PropTypes } from 'react'
import CommentList from 'components/CommentList'
import { newsStore, commentStore } from 'stores'
import { Link, browserHistory } from 'react-router'
import './style.css'

export default class CommentListPage extends Component {
  static propTypes = {
  }

  static contextTypes = {
    lang: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      comments: []
    }

    this.requestComments()
  }

  componentDidMount() {
    commentStore.addEventListener(this.change)
  }

  componentWillUnmount() {
    commentStore.removeEventListener(this.change)
  }

  requestComments() {
    setTimeout(() => {
      const newsId = this.props.params.id

      this.setState({
        comments: commentStore.getOrLoadNewsItemComments(newsId)
      })
    }, 0)
  }

  change = () => {
    this.requestComments()
  }

  render() {
    return (
      <div>
        {this.renderPagination()}
        {this.renderCommentList()}
      </div>
    )
  }

  renderPagination() {
    const { id, page } = this.props.params
    const newsItem = newsStore.getItem(id)

    if (!newsItem || !newsItem.content || !newsItem.hasLoadedComments) {
      const { lang } = this.context.lang
      const href = `/${lang}/news/${id}/comments/1`

      return (
        <Link to={href}>
          Комментарии
        </Link>
      )
    }

    var pages = []
    const maxPage = Math.floor(newsItem.comments.length / 10)

    if (page > maxPage) {
      browserHistory.replace(`/news/${id}/comments/${maxPage}`)
    }
    else if (isNaN(page)) {
      browserHistory.replace(`/news/${id}/comments/1`)
    }

    for (var i = 1; i <= maxPage; i++) {
      pages.push(i)
    }

    const links = pages.map(page => {
      const { lang } = this.context.lang
      const href = `/${lang}/news/${id}/comments/${page}`
      const firstIndex = (page - 1) * 10
      const fromTo = `${firstIndex + 1}..${firstIndex + 10}`

      return (
        <span key={page}>
          &nbsp;
          <Link to={href} activeClassName="active">{fromTo}</Link>
        </span>
      )
    })

    return (
      <div className="comment-links">
        Комментарии:
        {links}
      </div>
    )
  }

  renderCommentList() {
    const { id, page } = this.props.params
    const newsItem = newsStore.getItem(id)

    if (!newsItem || !newsItem.content) {
      return null
    }

    const isLoading = newsItem.isLoadingComments
    const isLoaded = newsItem.hasLoadedComments
    const firstIndex = 10 * (page - 1)
    const comments = this.state.comments.slice(firstIndex, firstIndex + 10)

    const props = {
      newsId: Number(id),
      comments: comments,
      isLoading: newsItem.isLoadingComments,
      isLoaded: newsItem.hasLoadedComments,
    }

    return <CommentList {...props} />
  }
}
