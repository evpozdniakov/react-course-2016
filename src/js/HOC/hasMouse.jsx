'use strict'

import React from 'react'

const hasMouseHOC = function(OriginalComponent) {
	return React.createClass({
		getInitialState() {
			return {hasMouse: false}
		},

		handleMouseEnter() {
			this.setState({hasMouse: true})
		},

		handleMouseLeave() {
			this.setState({hasMouse: false})
		},

		calcClassName(origClassName) {
			const hasMouseClass = 'has-mouse'

			return `${origClassName} ${hasMouseClass}`.split(' ').filter(part => {
				if (part === '') {
					return false
				}

				if (!this.state.hasMouse && part === hasMouseClass) {
					return false
				}

				return true
			}).join(' ')

		},

		render() {
			const props = {
				...this.state,
				calcClassName: this.calcClassName,
				mouseEnter: this.handleMouseEnter.bind(this),
				mouseLeave: this.handleMouseLeave.bind(this),
				...this.props,
			}

			return <OriginalComponent {...props} />
		}
	})
}

export default hasMouseHOC
