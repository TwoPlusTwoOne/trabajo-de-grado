import * as React from 'react'
import { SearchBar } from '../../components/catalog/searchBar/searchBar'
import { Product } from '../../util/types'
import { getPublications } from '../../api/api'
import { RouteComponentProps, withRouter } from 'react-router'

export type ExternalProps = {}

export type State = {
  publications: Publication[]
}

export type Props = ExternalProps & RouteComponentProps

class SearchBarContainer extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { publications: [] }
  }

  componentDidMount(): void {
    getPublications()
      .then(body => {
        this.setState({ publications: body })
      })
      .catch()
  }

  handleClickItem = (product: Product) => {
    this.props.history.push(`/products/${product.id}`)
  }

  render() {
    const { publications } = this.state

    return (
      <div>
        <SearchBar
          publications={publications}
          onSelectItem={this.handleClickItem}
        />
      </div>
    )
  }
}

const wrapped = withRouter(SearchBarContainer)
export { wrapped as SearchBarContainer }
