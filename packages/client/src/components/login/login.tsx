import * as React from 'react'
import * as styles from './login.scss'
import { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'
import { login } from '../../api/api'
import { LoginButton } from './loginButton'
import { Loader } from '../loader/loader'
import { User } from '../../helpers/auth'
import { Redirect } from 'react-router'

export type Props = {
  logIn: (user: User) => void
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

  logInSuccess = (user: User) => {
    this.props.logIn(user)
    this.setState({ redirect: '/' })
  }

  logInError = () => this.setState({ ...this.state, error: 'Invalid username/password' })

  handleLogIn = (response: any) => {
    if (response.status === 401) {
      this.logInError()
    } else {
      response.json().then( (user: User) => {
      console.log(user)
      this.logInSuccess(user)
      })
    }
  }

  handleError = () => this.setState({ ...this.state, error: 'There was a problem with the request' })

  stopLoggingIn = () => this.setState({ ...this.state, isLoggingIn: false })

  clearErrors = () => this.setState({ ...this.state, error: '' })

  handleClickLogin = () => {
    const { email, password } = this.state
    this.setState({ ...this.state, isLoggingIn: true }, this.clearErrors)
    login({ email, password })
      .then(this.handleLogIn)
      .catch(this.handleError)
      .then(this.stopLoggingIn)
  }

  handleChange = (field: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    this.setState({ ...this.state, [field]: value })
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
              <LoginButton onClick={this.handleClickLogin} />
            </div>
        }
        <div />
      </div>
    )
  }
}
