import * as React from 'react'
import { SearchBar } from '../../components/catalog/searchBar/searchBar'
import { Product } from '../../util/types'
import { getProducts } from '../../api/api'
import { RouteComponentProps, withRouter } from 'react-router'

export type ExternalProps = {}

export type State = {
  products: Product[]
}

export type Props = ExternalProps & RouteComponentProps

class SearchBarContainer extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { products: [] }
  }

  componentDidMount(): void {
    getProducts()
      .then(response => response.json())
      .then(body => this.setState({ products: body }))
  }

  handleClickItem = (product: Product) => {
    this.props.history.push(`/products/${product.id}`)
  }

  render() {
    const { products } = this.state

    return (
      <div>
        <SearchBar
          products={products}
          onSelectItem={this.handleClickItem}
        />
      </div>
    )
  }
}

const wrapped = withRouter(SearchBarContainer)
export { wrapped as SearchBarContainer }
