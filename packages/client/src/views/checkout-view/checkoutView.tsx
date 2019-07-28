import * as React from 'react'
import * as styles from './checkoutView.scss'
import { CartComponent } from '../../components/cart/cartComponent'
import { Paper } from '@material-ui/core'
import { Loader } from '../../components/loader/loader'
import { getLoggedUser } from '../../helpers/auth'
import { getCardKey, getCart } from '../../api/api'
import Typography from '@material-ui/core/Typography'
import { CreditCardForm } from '../../components/credit-card-form/creditCardForm'

export type Props = {}

export type State = {
  shoppingCart: Cart | null
  isFetchingCart: boolean
}

const wrapped = (content: any) => {
  return <div className={styles.container}>
    <Paper className={styles.paper}>
      {content}
    </Paper>
  </div>
}

export class CheckoutView extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      shoppingCart: null,
      isFetchingCart: false,
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

  handleCreditCardFormSubmit = (info: CreditCardInfo) => {
    const requestBody = {
      number: info.cardNumber,
      expireDate: info.expirationDate,
      owner: info.name,
      securityCode: info.securityCode,
      document: info.idNumber,
    }

    getCardKey()
      .then(response => response.text())
      .then(key => {

      })
  }

  render() {
    const { shoppingCart, isFetchingCart } = this.state

    if (!shoppingCart || isFetchingCart) return wrapped(<Loader />)

    return wrapped(
      <div>
        <div>
          <CartComponent shoppingCart={shoppingCart} readonly={true} />
        </div>
        <div className={styles.total}>
          <Typography variant={'h5'}>
            Total: $ {shoppingCart.publications.reduce((acc, pub) => acc + parseInt(pub.value), 0)}
          </Typography>
        </div>
        <div className={styles.payment}>
          <Typography variant={'h5'}>
            Enter your payment information
          </Typography>
          <CreditCardForm onSubmit={this.handleCreditCardFormSubmit}/>
        </div>
      </div>
    )
  }
}
