import * as React from 'react'
import * as styles from './base.scss'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import { isLoggedIn } from '../../helpers/auth'
import { SearchBarContainer } from '../../views/searchBarContainer/searchBarContainer'

export type Props = {}

export class Base extends React.PureComponent<Props> {
  render() {
    const isUserLoggedIn = isLoggedIn()
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={styles.toolbar}>
            <Typography variant="h6" color="inherit">
              FreeMarket
            </Typography>

            {
              isUserLoggedIn &&
              <div className={styles.searchBar}>
                <SearchBarContainer />
              </div>
            }
          </Toolbar>
        </AppBar>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
