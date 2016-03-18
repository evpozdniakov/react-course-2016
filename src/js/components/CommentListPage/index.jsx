import React, { Component } from 'react'
import CommentList from 'components/CommentList'
import { newsStore, commentStore } from 'stores'

export default class CommentListPage extends Component {
  static propTypes = {

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
    const { id, page } = this.props.params
    const newsItem = newsStore.getItem(id)

    if (!newsItem || !newsItem.content) {
      return null
    }

    const isLoading = newsItem.isLoadingComments
    const isLoaded = newsItem.hasLoadedComments

    const props = {
      newsId: Number(id),
      comments: this.state.comments,
      isLoading: newsItem.isLoadingComments,
      isLoaded: newsItem.hasLoadedComments,
    }

    return <CommentList {...props} />
  }
}
