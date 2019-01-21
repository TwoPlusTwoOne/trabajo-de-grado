import { Button } from '@material-ui/core'
import * as React from 'react'

export const LoginButton = (props: { onClick: () => void }) => <Button
  onClick={props.onClick}
  size="medium"
  variant="contained"
  color="primary"
>
  Login
</Button>