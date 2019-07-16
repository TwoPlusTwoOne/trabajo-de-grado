import * as React from 'react'
import { Container } from '../catalog/container/container'
import { getProducts } from '../../api/api'
import { Product } from '../../util/types'
import { Loader } from '../loader/loader'
import { SearchBar } from '../catalog/searchBar/searchBar'
import styles from './superComponent.scss'
import logo from '../../mercado-livre-logo.png'

export type Props = {}

  export type State = {
    products: Product[],
    searchedProducts: Product[],
    currentSearch: string
  }

export class SuperComponent extends React.PureComponent<Props, State> {

    state: State = {
        products: [],
        searchedProducts: [],
        currentSearch: ""
    }

    constructor(props: any) {
        super(props)
        this.notifySearch = this.notifySearch.bind(this)
      }

    componentDidMount() {
        getProducts()
        .then(response => response.json())
        .then(json => json.map((p:Product) =>  {
        return {
            id: p.id,
            description: p.description,
            images: p.images.split(','),
            name: p.name,
            value: p.value
        }
        }))
        .then(prods => this.setState({ ...this.state, products: prods, searchedProducts: prods, currentSearch: ""}))
    }

    notifySearch(search: string) {
        if(search === ""){
            this.setState({ ...this.state, searchedProducts: this.state.products, currentSearch: search})
        } else {
        const matchingProducts = this.state.products.filter((p: Product) =>
            p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
        this.setState({ ...this.state, searchedProducts: matchingProducts, currentSearch: search})
        }
    }

    loadBody() {
        if (this.state.products.length === 0) {
            return <Loader/>
        }else {
            return <Container products= {this.state.searchedProducts}/>
        }
    }

    render() {
        return (
            <div>
                <div className = {styles.searchBar}>
                    <img className = {styles.logoImage} src={logo} />
                </div>
            {this.loadBody()}
            </div>
            )
    }
}
