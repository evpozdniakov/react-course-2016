'use strict'

import React from 'react'
import ReactDOM, { render } from 'react-dom'
import Root from 'containers/Root'
import store from 'store'

render(<Root store={store} />, document.querySelector('#app-ctnr'))
