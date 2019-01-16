import * as React from 'react'
import { Button, TextField } from '@material-ui/core'
import { getAll } from '../../database';

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
          <Button onClick={() => getAll().then(console.log)} size="medium" variant="contained" color="default">Register</Button>
          <Button onClick={() => console.log('Click login')} size="medium" variant="contained" color="primary">Login</Button>
        </div>
      </div>
    )
  }
}