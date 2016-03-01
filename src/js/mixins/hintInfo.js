'use strict'

require('!style!css!HOC/hintInfo.css')

import $ from 'jquery'

const hintInfo = {
	showHintInfo(info) {
		$('#hint-info').text(info).removeClass('hidden')
	},

	hideHintInfo() {
		$('#hint-info').addClass('hidden')
	}
}

export default hintInfo