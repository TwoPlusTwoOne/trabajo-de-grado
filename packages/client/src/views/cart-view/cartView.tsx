import * as React from 'react'
import * as styles from './cartView.scss'
import classNames from 'classnames'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import { Loader } from '../../components/loader/loader'
import { EmptyStateMessage } from '../../components/empty-state-message/emptyStateMessage'
import { getCart } from '../../api/api'
import { getLoggedUser } from '../../helpers/auth'

export type Props = {}

export type State = {
  shoppingCart: Publication[]
  isFetchingChart: boolean
}

export class CartView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      shoppingCart: [],
      isFetchingChart: false,
    }
  }

  componentDidMount(): void {
    this.fetchCart()
  }

  fetchCart = () => {
    const user = getLoggedUser()
    getCart(user.id)
      .then(console.log)
      .catch(console.log)
  }


  renderContent = () => {
    const { isFetchingChart, shoppingCart } = this.state

    if (isFetchingChart) return <Loader />

    const isEmpty = !shoppingCart.length

    const className = classNames(styles.section, styles.cart, isEmpty && styles.empty)

    if (isEmpty) return <div className={className}>
      <EmptyStateMessage message={'You have no items in your shopping cart'} />
    </div>

    return <>
      <div className={className}>

      </div>
      <div>

      </div>
    </>
  }

  render() {
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
