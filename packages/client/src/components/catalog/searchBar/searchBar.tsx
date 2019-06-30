import * as React from 'react'
import Autocomplete from 'react-autocomplete'
import { Product } from '../../../util/types'
import styles from './searchBar.scss'

export type Props = {
    products: Product[],
    notifySearch: (s:string) => void,
    searchText: string
}
export type State = {
    productsNames: [],
    searchText: string
}


        

export class SearchBar extends React.PureComponent<Props, State> {

    state: State = {
        productsNames: [],
        searchText: ""
      }
    
      constructor(props: any) {
        super(props)
        const products = props.products
        const prodNames = products.map((p:Product) => p.name)
        this.setState({ ...this.state, productsNames: prodNames, searchText: props.searchText })
      }

    matchStateToTerm(state: Product, value: string) {
        return (
            value === "" ||
            state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
    }

    changeValue(event:any, newValue: string) {
        console.log(newValue)
        if(newValue === ""){
            this.props.notifySearch(newValue)
        }
        this.setState({ ...this.state, searchText: newValue })
    }

    

    render() {
        return (
          <div className={styles.searchBar}>
            <Autocomplete
              value={this.state.searchText}
              inputProps={{ className: styles.autocompleteInput}}
              wrapperStyle={{position: 'relative', display: 'inline-block', width: '100%'}}
              items={this.props.products}
              shouldItemRender={this.matchStateToTerm}
              getItemValue={(item) => item.name}
              onChange={(event, newvalue) => this.changeValue(event, newvalue)}
              onSelect={newvalue => this.props.notifySearch(newvalue)}
              renderMenu={(items, value) => (
                <div className={styles.suggestionMenu}>
                  {value === '' ? (
                    <div className="item">Ingrese el nombre de un producto</div>
                  ) : items.length === 0 ? (
                    <div className="item">No se encontraron resultados para: {value}</div>
                  ) : items}
                </div>
              )}
              renderItem={(item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={item.id}
                >{item.name}</div>
              )}
            />
            </div>
        )
    }
}