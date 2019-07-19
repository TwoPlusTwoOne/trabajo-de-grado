import * as React from 'react'
import { Login } from '../../components/login/login'
import { Paper } from '@material-ui/core'
import * as styles from './loginView.scss'
import { AuthContext } from '../../App'
import { AuthState } from '../../helpers/auth'

export type Props = {}

export const LoginView = () => (
  <Paper className={styles.container}>
    <div className={styles.loginComponent}>
      <AuthContext.Consumer>
        {
          (auth: AuthState) => <Login logIn={auth.logIn} />
        }
      </AuthContext.Consumer>
    </div>
  </Paper>
)
