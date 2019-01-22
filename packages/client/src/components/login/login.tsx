import * as React from 'react'
import { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'
import { getUserById, login } from '../../api/api'
import { RegisterButton } from './registerButton'
import { LoginButton } from './loginButton'
import * as styles from './login.scss'
import { Loader } from '../loader/loader'

export type Props = {}

export type State = {
  email: string
  password: string
  isLoggingIn: boolean
}

export class Login extends React.PureComponent<Props, State> {
  state: State = {
    email: '',
    password: '',
    isLoggingIn: false,
  }

  handleClickRegister = () => {
    getUserById(this.state.email)
      .then(response => response.json())
      .then(console.log)
      .catch(console.log)
  }

  handleClickLogin = () => {
    const { email, password } = this.state
    this.setState({ ...this.state, isLoggingIn: true })
    login({ email, password })
      .then(response => response.json())
      .then(console.log)
      .catch(console.log)
      .then(() => this.setState({ ...this.state, isLoggingIn: false }))
  }

  handleChange = (field: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    this.setState({ ...this.state, [field]: value })
  }

  render() {
    const { isLoggingIn, email, password } = this.state
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
          isLoggingIn
            ? <Loader />
            : <div className={styles.buttonsDiv}>
              <RegisterButton onClick={this.handleClickRegister} />
              <LoginButton onClick={this.handleClickLogin} />
            </div>
        }
        <div />
      </div>
    )
  }
}