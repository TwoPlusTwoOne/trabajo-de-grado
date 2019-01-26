import * as React from 'react'
import * as styles from './product.scss'
import { Product } from '../container/container'

export type Props = {
    product: Product
}

export type State = {}

export class ProductComponent extends React.PureComponent<Props, State> {

    constructor(props: any) {
        super(props)
    }

  render() {
    const { product } = this.props
    return (
      <div className={styles.container}>
        <img className = {styles.img}  src={product.images[0]}/>
        <label>{product.name}</label>
        <div />
      </div>
    )
  }
}