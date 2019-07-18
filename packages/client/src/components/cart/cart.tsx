import * as React from 'react'
import { Product } from '../../util/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import styles from './cart.scss'

export type Props = {
    products: Product[]
    notifyClick: () => any
}

export type State = {}

const style = {
    marginRight: '1%',
  };     

export class Cart extends React.PureComponent<Props, State> {
    
    render() {
        return (
            <div className={styles.cartDiv} onClick={this.props.notifyClick}>
                <div className={styles.counter}>
                    <a>{this.props.products.length}</a>
                </div>
                <div>
                    <FontAwesomeIcon icon={faShoppingCart} flip="horizontal"/>
                </div>
            </div>
        )
    }
}