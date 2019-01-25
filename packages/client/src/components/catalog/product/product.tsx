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
        console.log("asdasdasd")
    }

  render() {
    const { product } = this.props
    console.log(product)
    return (
      <div className={styles.container}>
        <img src={product.images[0]}/>
        <div />
      </div>
    )
  }
}