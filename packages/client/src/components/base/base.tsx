import * as React from 'react'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'

export type Props = {}

export class Base extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <AppBar  position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              FreeMarket
            </Typography>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    )
  }
}
