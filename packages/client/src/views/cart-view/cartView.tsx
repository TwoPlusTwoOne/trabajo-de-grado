import * as React from 'react'
import * as styles from './cartView.scss'
import classNames from 'classnames'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import { Loader } from '../../components/loader/loader'
import { EmptyStateMessage } from '../../components/empty-state-message/emptyStateMessage'
import { getCart, removeItemFromCart } from '../../api/api'
import { getLoggedUser } from '../../helpers/auth'
import { Button } from '../../components/button/button'
import { Redirect } from 'react-router'
import { CartComponent } from '../../components/cart/cartComponent'

export type Props = {}

export type State = {
  shoppingCart: Cart | null
  isFetchingCart: boolean
  isRemovingItem: boolean
  redirect?: string
}

export class CartView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      shoppingCart: null,
      isFetchingCart: false,
      isRemovingItem: false,
    }
  }

  componentDidMount(): void {
    this.fetchCart()
  }

  fetchCart = () => {
    this.setState({ isFetchingCart: true })
    const user = getLoggedUser()
    getCart(user.userID)
      .then(response => response.json())
      .then(cart => this.setState({ shoppingCart: cart, isFetchingCart: false }))
  }

  onClickRemove = (publicationId: number) => () => {
    const { shoppingCart } = this.state
    if (!shoppingCart) return

    this.setState({ isRemovingItem: true })
    removeItemFromCart({ publicationId, cartId: shoppingCart.id })
      .then(() => this.fetchCart())
      .then(() => this.setState({ isRemovingItem: false }))
  }

  handleClickProceedToCheckout = () => {
    this.setState({ redirect: '/checkout' })
  }


  renderContent = () => {
    const { isFetchingCart, shoppingCart, isRemovingItem } = this.state

    if (isFetchingCart || !shoppingCart || isRemovingItem) return <div
      className={classNames(styles.section, styles.cart, styles.isLoading)}
    >
      <Loader />
    </div>

    const isEmpty = !shoppingCart.publications.length

    if (isEmpty) return <div className={classNames(styles.section, styles.cart, isEmpty && styles.empty)}>
      <EmptyStateMessage message={'You have no items in your shopping cart'} />
    </div>

    return <>
      <CartComponent shoppingCart={shoppingCart} onClickRemove={this.onClickRemove} />
      <div className={styles.checkoutButtonDiv}>
        <div>
          <div className={styles.total}>
            <Typography variant={'h5'}>
              Total: $ {shoppingCart.publications.reduce((acc, pub) => acc + parseInt(pub.value), 0)}
            </Typography>
          </div>
          <Button className={styles.checkoutButton} kind={'primary'} onClick={this.handleClickProceedToCheckout}>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </>
  }

  render() {
    const { redirect } = this.state

    if (redirect) return <Redirect to={redirect} />

    return (
      <div className={styles.container}>
        <Paper className={styles.paper}>
          <div className={classNames(styles.section, styles.title)}>
            <Typography variant={'h5'}>Your shopping cart</Typography>
          </div>
          {this.renderContent()}
        </Paper>
      </div>
    )
  }
}
