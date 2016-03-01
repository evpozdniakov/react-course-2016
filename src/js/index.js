'use strict'

require('!style!css!components/news.css')

import React from 'react'
import ReactDOM from 'react-dom'
import NewsList from 'components/newsList'

const newsData = require('json!./news.json')
const newsList = React.createElement(NewsList, {newsData: newsData});

ReactDOM.render(newsList, document.querySelector('#news-ctnr'));
