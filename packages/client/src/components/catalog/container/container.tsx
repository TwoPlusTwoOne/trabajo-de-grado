import * as React from 'react'
import * as styles from './container.scss'
import { ProductComponent } from '../product/product'
import { Product } from '../../../util/types'
import { Redirect } from 'react-router'

export type Props = {
  products: Product[]
}

export type State = {
  redirect?: string
}

export class Container extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {}
  }


  handleComponentClick = (product: Product) => {
    this.setState({ redirect: `/products/${product.id}` })
  }

  render() {
    const { products } = this.props
    const { redirect } = this.state

    if (redirect) return <Redirect to={redirect} />

    return <div className={styles.container}>
      {
        products.map(p => <ProductComponent onClick={this.handleComponentClick} product={p} />)
      }
    </div>
  }
}
