'use strict'

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './style.css'
import { setLang } from 'i18n'

export default class Body extends Component {
  static contextTypes = {
    lang: PropTypes.string
  }

  render() {
    setLang(this.props.params.lang)

    return (
      <div>
        {this.renderHeader()}
        {this.props.children}
      </div>
    )
  }

  renderHeader() {
    const { pathname } = this.props.location
    const pathParts = pathname.split('/')

    const langNav = ['en', 'ru'].map(lang => {
      pathParts[1] = lang
      const to = pathParts.join('/')
      return <Link key={lang} to={to} activeClassName="active">{lang}</Link>
    })

    return (
      <header>
        <div className="lang-nav">
          {langNav}
        </div>
      </header>
    )
  }
}
