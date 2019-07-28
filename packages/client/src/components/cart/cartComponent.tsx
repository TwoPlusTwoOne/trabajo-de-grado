import * as React from 'react'
import styles from './cartComponent.scss'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography/Typography'
import { Button } from '../button/button'

export type Props = {
  shoppingCart: Cart
  readonly?: boolean
  onClickRemove?: (publicationId: number) => void
}

export type State = {}

export class CartComponent extends React.PureComponent<Props, State> {

  render() {
    const { shoppingCart, readonly, onClickRemove } = this.props

    return (
      <div className={classNames(styles.section, styles.cart)}>
        {shoppingCart.publications.map(publication => <div className={styles.cartItem}>
          <div className={styles.image}>
            <img alt={publication.name} src={publication.images[0] && publication.images[0].image} />
          </div>
          <div className={styles.nameAndPrice}>
            <div><Typography variant={'h5'}>{publication.name}</Typography></div>
            <div>$ {publication.value}</div>
          </div>
          {
            !readonly
            && <div className={styles.removeButton}>
              <Button
                kind={'danger'}
                onClick={() => onClickRemove && onClickRemove(publication.id)}
              >
                Remove
              </Button>
            </div>
          }
        </div>)}
      </div>

    )
  }
}
