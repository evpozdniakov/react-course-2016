import React, {Component} from 'react'

export default OriginalComponent => {
	return class extends Component {
		constructor() {
			super()

			this.state = {mlsSpent: 0}
		}

		startCountTime() {
			this._mark = new Date()
			this._mlsSpent = this.state.mlsSpent

			this._timer = setInterval(() => {
				this.setState({mlsSpent: this._mlsSpent + (new Date() - this._mark)})
			}, 1)
		}

		stopCountTime() {
			clearInterval(this._timer)
		}

		render() {
			const props = {
				mlsSpent: this.state.mlsSpent,
				onMouseEnter: this.startCountTime.bind(this),
				onMouseLeave: this.stopCountTime.bind(this),
				...this.props
			}

			return (
				<OriginalComponent {...props} />
			)
		}
	}
}