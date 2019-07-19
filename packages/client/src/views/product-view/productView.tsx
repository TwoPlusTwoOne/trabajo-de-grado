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
  isLoading: boolean
}

export class ProductView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      product: null,
      isLoading: false
    }
  }


  componentDidMount(): void {
    this.getProductToShow()
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (this.props.match.params.productId !== prevProps.match.params.productId) {
      this.getProductToShow()
    }
  }

  getProductToShow = () => {
    this.setState({ isLoading: true })
    const id = parseInt(this.props.match.params.productId)
    if (!isNaN(id)) {
      getProductById(id)
        .then(product => {
          this.setState({ product, isLoading: false })
        })
        .catch(() => this.setState({ isLoading: false }))
    }
  }

  render() {
    const { product, isLoading } = this.state

    if (isLoading || !product) return <Loader />

    return <div>
      <Product product={product} />
    </div>
  }
}
