import * as React from 'react'
import { auth } from '../../helpers/auth'
import { RouteProps, Route, Redirect } from 'react-router-dom'

export class SecuredRoute extends React.PureComponent<RouteProps> {

  render() {
    if (auth.isLoggedIn()) return <Route {...this.props} />

    return <Redirect to={'/login'} />
  }
}