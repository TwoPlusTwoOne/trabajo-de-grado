import * as React from 'react'
import classNames from 'classnames'
import Autocomplete from 'react-autocomplete'
import { Product } from '../../../util/types'
import styles from './searchBar.scss'

export type Props = {
  products: Product[],
  onSelectItem: (product: Product) => void
}
export type State = {
  query: String
}

const matchesQuery = (item: Product, value: string) => item.name.indexOf(value) > -1

const SearchResultItem = (props: { highlighted: boolean, item: any }) => <div
  className={classNames(styles.renderItem, 'item', props.highlighted && 'item-highlighted')}

>{props.item.name}</div>

export class SearchBar extends React.PureComponent<Props, State> {

  state: State = {
    query: ''
  }

  constructor(props: any) {
    super(props)

    this.state = { query: '' }
  }

  handleQueryChange = (e: any, query: String) => this.setState({ query })

  handleSelect = (value: string, item: Product) => {
    this.setState({ query: value })
    this.props.onSelectItem(item)
  }

  render() {
    const { query } = this.state
    return (
      <div className={styles.searchBar}>
        <Autocomplete
          value={query}
          // inputProps={{ className: styles.autocompleteInput }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={this.props.products}
          shouldItemRender={matchesQuery}
          getItemValue={(item) => item.name}
          onChange={this.handleQueryChange}
          onSelect={this.handleSelect}
          renderMenu={(items, value) => (
            <div className={styles.suggestionMenu}>
              {value === '' ? (
                <div className="item">Ingrese el nombre de un producto</div>
              ) : items.length === 0 ? (
                <div className="item">No se encontraron resultados para: {value}</div>
              ) : items}
            </div>
          )}
          renderItem={(item, isHighlighted) => <SearchResultItem
            highlighted={isHighlighted} key={item.id}
            item={item} />}
        />
      </div>
    )
  }
}
