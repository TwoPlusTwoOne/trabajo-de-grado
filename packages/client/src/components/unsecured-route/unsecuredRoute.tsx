import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { auth } from '../../helpers/auth'

export class UnsecuredRoute extends React.PureComponent<RouteProps> {
  render() {
    if (!auth.isLoggedIn()) return <Route {...this.props} />

    return <Redirect to={'/login'} />
  }
}