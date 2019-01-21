import * as React from 'react'
import { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'
import { getAllXss, getUserById } from '../../api/api'
import { RegisterButton } from './registerButton'
import { LoginButton } from './loginButton'

export type Props = {}

export type State = {
  username: string
  value: string
}

export class Login extends React.PureComponent<Props, State> {
  state = {
    username: '',
    value: '',
  }

  componentDidMount(): void {
    getAllXss().then(response => response.json()).then(value => this.setState({
      ...this.state,
      value: value.results[0].value
    }))
  }

  handleClickRegister = () => {
    getUserById(this.state.username).then(response => response.json()).then(console.log).catch(console.log)
  }

  handleClickLogin = () => {

  }

  handleChange = (field: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    this.setState({ ...this.state, [field]: value })
  }

  render() {
    const { value } = this.state
    console.log({ value })
    return (
      <div className={'login-component'}>
        <TextField
          placeholder={'Username'}
          variant={'outlined'}
          value={this.state.username}
          onChange={this.handleChange.bind(null, 'userId')}
        />
        <TextField
          placeholder={'Password'}
          type={'password'}
          variant={'outlined'}
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