'use strict'

import React from 'react'

const timeSpent = {
	getInitialState() {
		return {mlsSpent: 0}
	},

	startCountTime() {
		const mark = new Date()
		const mlsSpent = this.state.mlsSpent

		this.timeSpentTimer = setInterval(() => {
			this.setState({mlsSpent: mlsSpent + (new Date() - mark)})
		}, 1)
	},

	stopCountTime() {
		clearInterval(this.timeSpentTimer)
	},

	timeSpentToString() {
		const mlsSpent = this.state.mlsSpent

		if (mlsSpent < 1000) {
			return mlsSpent
		}

		return Math.round(mlsSpent / 1000) + 's'
	},

	renderTimeSpent() {
		return <span className="time-spent">{this.timeSpentToString()}</span>
	}
}

export default timeSpent