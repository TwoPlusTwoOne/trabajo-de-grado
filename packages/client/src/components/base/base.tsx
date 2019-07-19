import * as React from 'react'
import * as styles from './base.scss'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import { User } from '../../helpers/auth'
import { SearchBarContainer } from '../../views/searchBarContainer/searchBarContainer'
import { Profile } from '../profile/profile'
import { RouteComponentProps, withRouter } from 'react-router'

export type ExternalProps = {
  loggedUser: User | null
}
export type Props = ExternalProps & RouteComponentProps

export type State = {}

class Base extends React.Component<Props, State> {

  navigateToHome = () => this.props.history.push('/')

  render() {
    const { loggedUser, children } = this.props

    return <div className={styles.container}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbar}>
          <div className={styles.logo}>
            <Typography variant="h6" color="inherit" onClick={this.navigateToHome} className={styles.logoText}>
              <div>FreeMarket</div>
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

const wrapped = withRouter(Base)
export { wrapped as Base }
