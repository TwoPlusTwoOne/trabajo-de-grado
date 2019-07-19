import * as React from 'react'
import * as styles from './base.scss'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import { User } from '../../helpers/auth'
import { SearchBarContainer } from '../../views/searchBarContainer/searchBarContainer'
import { Profile } from '../profile/profile'

export type Props = {
  loggedUser: User | null
}

export type State = {}

export class Base extends React.PureComponent<Props, State> {
  render() {
    const { loggedUser, children } = this.props

    return <div className={styles.container}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbar}>
          <div>
            <Typography variant="h6" color="inherit">
              FreeMarket
            </Typography>
          </div>

          <div className={styles.searchBar}>
            {loggedUser && <SearchBarContainer />}
          </div>

          <div>
            {loggedUser && <Profile user={loggedUser} />}
          </div>
        </Toolbar>
      </AppBar>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  }
}
