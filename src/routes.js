import React from 'react'
import { Switch, Route } from 'react-router-dom'

import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={GlobalFeed} />
      <Route path='/login' component={Authentication} />
      <Route path='/register' component={Authentication} />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  )
}

export default Routes
