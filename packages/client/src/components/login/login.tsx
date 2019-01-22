import * as React from 'react'
import { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'
import { getUserById, login } from '../../api/api'
import { RegisterButton } from './registerButton'
import { LoginButton } from './loginButton'

export type Props = {}

export type State = {
  email: string
  password: string
}

export class Login extends React.PureComponent<Props, State> {
  state: State = {
    email: '',
    password: '',
  }

  handleClickRegister = () => {
    getUserById(this.state.email)
      .then(response => response.json())
      .then(console.log)
      .catch(console.log)
  }

  handleClickLogin = () => {
    const { email, password } = this.state
    login({ email, password })
      .then(response => response.json())
      .then(console.log)
      .catch(console.log)
  }

  handleChange = (field: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    this.setState({ ...this.state, [field]: value })
  }

  render() {
    return (
      <div className={'login-component'}>
        <TextField
          placeholder={'Email'}
          variant={'outlined'}
          value={this.state.email}
          onChange={this.handleChange.bind(null, 'email')}
        />
        <TextField
          placeholder={'Password'}
          type={'password'}
          variant={'outlined'}
          value={this.state.password}
          onChange={this.handleChange.bind(null, 'password')}
        />
        <div className={'login-component-buttons'}>
          <RegisterButton onClick={this.handleClickRegister} />
          <LoginButton onClick={this.handleClickLogin} />
        </div>
        <div />
      </div>
    )
  }
}