import * as React from 'react'
import { Login } from '../components/login/login'
import { Paper } from '@material-ui/core'

export type Props = {}

export class LoginView extends React.PureComponent<Props> {
  render() {
    console.log('process env database url:', process.env.REACT_APP_DATABASE_URL)

    return (
      <div className={'login-view-container'}>
        <Paper>
          <div className={'login-component-container'}>
            <Login />
          </div>
        </Paper>
      </div>
    )
  }
}