import {Component} from 'react'

return function(OriginalComponent) {
	return class extends Component {
		constructor() {
			this.state: {mlsSpent: 0}
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
			const props {
				mlsSpent: this.state.mlsSpent,
				onMouseEnter: this.startCountTime,
				onMouseLeave: this.stopCountTime,
				...this.props
			}
			return (
				<OriginalComponent {...props} />
			)
		}
	}
}