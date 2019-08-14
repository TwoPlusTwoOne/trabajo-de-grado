import * as React from 'react'
import { RouteProps, Route, Redirect } from 'react-router'
import { getLoggedUser, isLoggedIn } from '../../helpers/auth'
import { Loader } from '../loader/loader'
import { fetchIsAdmin } from '../../api/api'

export type Props = RouteProps & {}

export type State = {
  isAdmin?: boolean
}

export class AdminRoute extends React.Component<RouteProps, State> {

  constructor(props: Props) {
    super(props)

    this.state = {}
  }


  componentDidMount(): void {
    if (isLoggedIn())
      fetchIsAdmin(getLoggedUser().id).then(resp => {
        if (resp.status === 200)
          this.setState({ isAdmin: true })
        else
          this.setState({ isAdmin: false })
      })
    else
      this.setState({ isAdmin: false })
  }

  render() {
    const { isAdmin } = this.state
    if (isAdmin === undefined) return <Loader />

    return isAdmin
      ? <Route {...this.props} />
      : <Redirect to={'/'} />
  }
}
