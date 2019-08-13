import * as React from 'react'
import { RouteProps, Route, Redirect } from 'react-router'
import { isAdmin, isLoggedIn } from '../../helpers/auth'

export type Props = RouteProps & {}

export const AdminRoute = (props: RouteProps) => (isLoggedIn() && isAdmin())
  ? <Route {...props} />
  : <Redirect to={'/'} />
