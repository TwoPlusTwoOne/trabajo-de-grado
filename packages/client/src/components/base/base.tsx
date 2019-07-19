import * as React from 'react'
import * as styles from './base.scss'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import { isLoggedIn } from '../../helpers/auth'
import { SearchBarContainer } from '../../views/searchBarContainer/searchBarContainer'
import { Profile } from '../profile/profile'

export type Props = {}

export class Base extends React.PureComponent<Props> {
  render() {
    const isUserLoggedIn = isLoggedIn()
    return (
      <div className={styles.container}>
        <AppBar position="fixed">
          <Toolbar className={styles.toolbar}>
            <div>
              <Typography variant="h6" color="inherit">
                FreeMarket
              </Typography>
            </div>

            <div className={styles.searchBar}>
              <SearchBarContainer />
            </div>

            <div>
              {isUserLoggedIn && <Profile />}
            </div>
          </Toolbar>
        </AppBar>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
