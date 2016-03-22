'use strict'

import React from 'react'
import { Router, IndexRedirect, Redirect, Route, browserHistory } from 'react-router'
import routes from './routes'
import NotFound from 'components/NotFound'
import NewsList from 'components/NewsList'
import NewsItemPage from 'components/NewsItemPage'
import CommentListPage from 'components/CommentListPage'
import Body from 'components/Body'

export default (
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRedirect to="ru" />
      <Route path=":lang" component={Body}>
        <IndexRedirect to="news" />
        <Route path="news" component={NewsList}>
          <Route path=":id" component={NewsItemPage}>
            <Route path="comments">
              <IndexRedirect to="1" />
              <Route path=":page" component={CommentListPage} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)
