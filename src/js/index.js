'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import NewsList from 'components/NewsList'

ReactDOM.render(
  React.createElement(NewsList),
  document.querySelector('#news-ctnr')
);
