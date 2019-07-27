import * as React from 'react'
import * as styles from './profile.scss'
import { AuthState, User } from '../../helpers/auth'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import IconButton from '@material-ui/core/IconButton/IconButton'
import { AccountCircle, ShoppingCart } from '@material-ui/icons'
import Menu from '@material-ui/core/Menu/Menu'
import { AuthContext } from '../../App'
import Typography from '@material-ui/core/Typography/Typography'

export type ExternalProps = {
  user: User
  onClickGoToMyPublications: () => void
  onClickGoToMyOrders: () => void
  onClickGoToMySales: () => void
  onClickShoppingCart: () => void
}

export type Props = ExternalProps & {
  onLogOut: () => void
}

export type State = {
  anchorEl: HTMLElement | null
}

class Profile extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { anchorEl: null }
  }

  handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => this.setAnchorEl(event.currentTarget)

  handleMenuClose = () => this.setAnchorEl(null)

  setAnchorEl = (anchorEl: HTMLElement | null) => this.setState({ anchorEl })

  renderMenu = () => {
    const { anchorEl } = this.state
    const isMenuOpen = Boolean(anchorEl)

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClickGoToMyPublications}>My publications</MenuItem>
        <MenuItem onClick={this.handleClickGoToMySales}>My sales</MenuItem>
        <MenuItem onClick={this.handleClickGoToMyOrders}>My orders</MenuItem>
        <MenuItem onClick={this.logOut}>Log out</MenuItem>
      </Menu>
    )
  }

  handleClickGoToMyPublications = () => {
    this.props.onClickGoToMyPublications()
    this.handleMenuClose()
  }

  handleClickGoToMySales = () => {
    this.props.onClickGoToMySales()
    this.handleMenuClose()
  }

  handleClickGoToMyOrders = () => {
    this.props.onClickGoToMyOrders()
    this.handleMenuClose()
  }
  logOut = () => {
    this.props.onLogOut()
  }

  handleClickShoppingCart = () => {
    this.props.onClickShoppingCart()
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.profileWrapper}>
          <div className={styles.welcomeMessage}>
            <Typography color={'inherit'} variant={'subtitle1'}>Welcome, {this.props.user.first_name}!</Typography>
          </div>
          <MenuItem className={styles.profileIcon} onClick={this.handleClickShoppingCart}>
            <IconButton
              aria-haspopup="true"
              color={'inherit'}
              className={styles.iconButton}
            >
              <ShoppingCart />
            </IconButton>
          </MenuItem>
          <MenuItem className={styles.profileIcon} onClick={this.handleProfileMenuOpen}>
            <IconButton
              aria-label="Account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color={'inherit'}
              className={styles.iconButton}
            >
              <AccountCircle />
            </IconButton>
          </MenuItem>
        </div>
        {this.renderMenu()}
      </div>
    )
  }
}

const wrappedProfile = (props: ExternalProps) => <AuthContext.Consumer>
  {(state: AuthState) => <Profile {...props} onLogOut={state.logOut} />}
</AuthContext.Consumer>

export { wrappedProfile as Profile }
