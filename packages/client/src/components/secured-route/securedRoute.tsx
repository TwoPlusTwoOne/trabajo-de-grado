import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { isLoggedIn } from '../../helpers/auth'

export type Props = RouteProps & {}

export const SecuredRoute = (props: Props) =>
  isLoggedIn()
    ? <Route {...props} />
    : <Redirect to={'/login'} />