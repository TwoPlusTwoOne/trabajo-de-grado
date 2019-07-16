import * as React from 'react'
import { getProductById } from '../../api/api'
import { Product, ProductType } from '../../components/product/product'
import { Loader } from '../../components/loader/loader'

export type Props = {
  match: {
    params: {
      productId: string
    }
  }
}

export type State = {
  product: ProductType | null
}

export class ProductView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      product: null
    }
  }


  componentDidMount(): void {
    const id = parseInt(this.props.match.params.productId)
    if (!isNaN(id)) {
      getProductById(id)
        .then(product => {
          this.setState({ product })
        })
    }
  }

  render() {
    const product = this.state.product

    if (!product) return <Loader />

    return <div>
      <Product product={product} />
    </div>
  }
}
