import * as React from 'react'
import { Login } from '../../components/login/login'
import { Paper } from '@material-ui/core'
import * as styles from './loginView.scss'

export type Props = {}

export class LoginView extends React.PureComponent<Props> {
  render() {

    return (
      <div className={styles.container}>
        <Paper>
          <div className={styles.loginComponent}>
            <Login />
          </div>
        </Paper>
      </div>
    )
  }
}