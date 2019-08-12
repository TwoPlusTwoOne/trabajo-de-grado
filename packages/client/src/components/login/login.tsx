import * as React from 'react'
import * as styles from './login.scss'
import { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'
import { login } from '../../api/api'
import { LoginButton } from './loginButton'
import { Loader } from '../loader/loader'
import { User } from '../../helpers/auth'
import { Redirect } from 'react-router'
import { Button } from '../button/button'

export type Props = {
  logIn: (user: User, token: string) => void
}

export type State = {
  email: string
  password: string
  isLoggingIn: boolean
  error: string
  redirect?: string
}

export class Login extends React.PureComponent<Props, State> {
  state: State = {
    email: '',
    password: '',
    isLoggingIn: false,
    error: '',
  }

  logInSuccess = (user: User, token: string) => {
    this.props.logIn(user, token)
    this.setState({ redirect: '/' })
  }

  handleLogIn = (response: LoginResponse | string) => {
    if (typeof response === 'string') throw Error(response)

    console.log(JSON.stringify(response.user))
    const user = response.user[0]
    const token = response.token

    if (user.client_id) {
      const client = {
        ...user,
        userID: user.client_id,
        id: user.user_id,
      }

      this.logInSuccess(client, token)
    }
    // else handle admin log in
  }

  handleError = (error: Error) => {
    this.setState({ ...this.state, error: error.message, isLoggingIn: false })
  }

  clearErrors = () => this.setState({ ...this.state, error: '' })

  handleClickLogin = () => {
    const { email, password } = this.state
    this.setState({ ...this.state, isLoggingIn: true }, this.clearErrors)
    login({ email, password })
      .then(this.handleLogIn)
      .catch(this.handleError)
  }

  handleChange = (field: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    this.setState({ ...this.state, [field]: value })
  }

  handleClickRegister = () => {
    this.setState({ redirect: '/register' })
  }

  render() {
    const { isLoggingIn, email, password, redirect, error } = this.state

    if (redirect) return <Redirect to={redirect} />

    return (
      <div className={styles.container}>
        <TextField
          placeholder={'Email'}
          variant={'outlined'}
          value={email}
          disabled={isLoggingIn}
          onChange={this.handleChange.bind(null, 'email')}
        />
        <TextField
          placeholder={'Password'}
          type={'password'}
          variant={'outlined'}
          value={password}
          disabled={isLoggingIn}
          onChange={this.handleChange.bind(null, 'password')}
        />
        {
          error && <span className={styles.error}>{error}</span>
        }
        {
          isLoggingIn
            ? <Loader />
            : <div className={styles.buttonsDiv}>
              <div><LoginButton onClick={this.handleClickLogin} /></div>
              <div><Button kind={'secondary'} onClick={this.handleClickRegister}>Register</Button></div>
            </div>
        }
        <div />
      </div>
    )
  }
}
