import React, { Component } from 'react'

export default class CommentListPage extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)
  }

  render() {
    const { id, page } = this.props.params

    return <div>Here will be comment page {page} for news item {id}</div>
  }
}