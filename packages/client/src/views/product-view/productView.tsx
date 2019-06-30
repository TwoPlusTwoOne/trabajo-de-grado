import * as React from 'react'
import { getProductById } from '../../api/api'
import { ProductType } from '../../components/product/product'

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
    // TODO after fetching product, set state for active product
    getProductById(this.props.match.params.productId).then(console.log)
  }

  render() {
    console.log('props: ', this.props)
    return <div />
  }
}