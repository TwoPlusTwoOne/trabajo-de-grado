import * as React from 'react'
import { SearchBar } from '../../components/catalog/searchBar/searchBar'
import { Product } from '../../util/types'
import { getProducts } from '../../api/api'

export type Props = {}

export type State = {
  products: Product[]
}

export class SearchBarContainer extends React.PureComponent<Props, State> {

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
    console.log('select item ', { product })
  }

  render() {
    const { products } = this.state

    console.log({ products })

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
