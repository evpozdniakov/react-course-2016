'use strict'

import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import routes from './routes'
import NotFound from 'components/NotFound'
import NewsList from 'components/NewsList'

export default (
  <Router history={browserHistory}>
    <Route path="/news" component={NewsList} />
    <Route path="*" component={NotFound} />
  </Router>
)
