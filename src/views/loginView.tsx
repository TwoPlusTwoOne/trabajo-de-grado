import * as React from 'react'
import { Login } from '../components/login/login'

export type Props = {}

export class LoginView extends React.PureComponent<Props> {
  render() {
    return (
      <div className={'login-view-container'}>
        <div className={'login-component-container'}>
          <Login />
        </div>
      </div>
    )
  }
}