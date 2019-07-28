import * as React from 'react'
import * as styles from './productView.scss'
import { addItemToCart, getCart, getPublicationById, getQuestionsForPublication } from '../../api/api'
import { PublicationComponent, PublicationWithQnA } from '../../components/product/publicationComponent'
import { Loader } from '../../components/loader/loader'
import Paper from '@material-ui/core/Paper/Paper'
import { getLoggedUser } from '../../helpers/auth'

export type Props = {
  match: {
    params: {
      productId: string
    }
  }
}

export type State = {
  product: PublicationWithQnA | null
  isLoading: boolean
  isAddingToCart: boolean
}

export class ProductView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      product: null,
      isLoading: false,
      isAddingToCart: false,
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
      getPublicationById(id.toString())
        .then((publication: Publication) => {
          getQuestionsForPublication(publication.id)
            .then((qa: PublicationQnA[]) => {
              this.setState({ product: { ...publication, qa }, isLoading: false })
            })
        })
        .catch(() => this.setState({ isLoading: false }))
    }
  }

  handleClickAddToCart = (publication: Publication) => () => {
    this.setState({ isAddingToCart: true })
    getCart(getLoggedUser().userID)
      .then(response => response.json())
      .then(cart =>
        addItemToCart({
          cartId: cart.id,
          publicationId: publication.id
        }))
      .then(() => this.setState({ isAddingToCart: false }))
  }

  render() {
    const { product, isLoading, isAddingToCart } = this.state

    if (isLoading || !product) return <Loader />

    return <div className={styles.productContainer}>
      <Paper className={styles.product}>
        <PublicationComponent
          isAddingToCart={isAddingToCart}
          onClickAddToCart={this.handleClickAddToCart(product)}
          publication={product}
        />
      </Paper>
    </div>
  }
}
