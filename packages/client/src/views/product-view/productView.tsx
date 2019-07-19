import * as React from 'react'
import * as styles from './productView.scss'
import { getProductById, getQuestionsForProduct } from '../../api/api'
import { Product, ProductQnA, ProductWithQnAType } from '../../components/product/product'
import { Loader } from '../../components/loader/loader'
import Paper from '@material-ui/core/Paper/Paper'

export type Props = {
  match: {
    params: {
      productId: string
    }
  }
}

export type State = {
  product: ProductWithQnAType | null
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
          getQuestionsForProduct(product.id)
            .then(response => response.json())
            .then((qa: ProductQnA) => {
              this.setState({ product: { ...product, qa }, isLoading: false })
            })
        })
        .catch(() => this.setState({ isLoading: false }))
    }
  }

  render() {
    const { product, isLoading } = this.state

    if (isLoading || !product) return <Loader />

    return <div className={styles.productContainer}>
      <Paper className={styles.product}>
        <Product product={product} />
      </Paper>
    </div>
  }
}
