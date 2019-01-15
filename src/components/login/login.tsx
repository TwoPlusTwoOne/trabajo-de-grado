import * as React from 'react'
import { Button, TextField } from '@material-ui/core'

export type Props = {}

export class Login extends React.PureComponent<Props> {
  render() {
    return (
      <div className={'login-component'}>
        <TextField
          placeholder={'Username'}
          variant={'outlined'}
        />
        <TextField
          placeholder={'Password'}
          type={'password'}
          variant={'outlined'}
        />
        <div className={'login-component-buttons'}>
          <Button onClick={() => console.log('Click Register')} size="medium" variant="contained" color="default">Register</Button>
          <Button onClick={() => console.log('Click login')} size="medium" variant="contained" color="primary">Login</Button>
        </div>
      </div>
    )
  }
}