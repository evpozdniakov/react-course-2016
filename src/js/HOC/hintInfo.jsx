'use strict'

require('!style!css!HOC/hintInfo.css')

import React, {Component} from 'react'
import $ from 'jquery'

export default OriginalComponent => {
	return class extends Component {
		constructor() {
			super()

			this._hintCtnr = $('#hint-info')
		}

		showHintInfo(info) {
			this._hintCtnr
				.text(info)
				.removeClass('hidden')
		}

		hideHintInfo() {
			this._hintCtnr
				.addClass('hidden')
		}

		render() {
			const props = {
				showHintInfo: this.showHintInfo.bind(this),
				hideHintInfo: this.hideHintInfo.bind(this),
				...this.props
			}

			return <OriginalComponent {...props} />
		}
	}
}