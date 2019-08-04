import * as React from 'react'
import { RouteProps, Route, Redirect } from 'react-router'
import { isAdmin } from '../../helpers/auth'

export type Props = RouteProps & {}

export const AdminRoute = (props: RouteProps) => isAdmin() ? <Route {...props} /> : <Redirect to={'/'}/>
