import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment } from 'actions/counter'

class AppContainer extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
  }

  handleIncrement = () => {
    this.props.increment(1)
  }

  render() {
    const { counter } = this.props

    return (
      <div onClick={this.handleIncrement}>
        <h1>Click me!</h1>
        <h3>Clicked {counter} times</h3>
      </div>
    )
  }
}

export default connect(state => {
  const { counter } = state
  return {counter}
}, {
  increment
})(AppContainer)