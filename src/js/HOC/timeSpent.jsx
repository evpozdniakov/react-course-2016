'use strict'

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

		timeSpentToString() {
			const mlsSpent = this.state.mlsSpent

			if (mlsSpent < 1000) {
				return mlsSpent
			}

			return Math.round(mlsSpent / 1000) + 's'
		}

		render() {
			const props = {
				mlsSpent: this.state.mlsSpent,
				startCountTime: this.startCountTime.bind(this),
				stopCountTime: this.stopCountTime.bind(this),
				renderTimeSpent: this.renderTimeSpent.bind(this),
				...this.props
			}

			return (
				<OriginalComponent {...props} />
			)
		}

		renderTimeSpent() {
		  return <span className="time-spent">{this.timeSpentToString()}</span>
		}
	}
}