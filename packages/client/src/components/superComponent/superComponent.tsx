import * as React from 'react'
import { Container } from '../catalog/container/container'
import { getProducts } from '../../api/api'
import { Product } from '../../util/types'
import { Loader } from '../loader/loader'
import { SearchBar } from '../catalog/searchBar/searchBar'
import styles from './superComponent.scss'
import logo from '../../mercado-livre-logo.png'
import { Cart } from "../cart/cart";
export type Props = {}
  
  export type State = {
    products: Product[],
    searchedProducts: Product[],
    cart: Product[],
    currentSearch: string
  }

export class SuperComponent extends React.PureComponent<Props, State> {

    state: State = {
        products: [],
        searchedProducts: [],
        cart:[],
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
    
    onCartClick(){
        alert("Cart clicked!")
    }

    render() { 
        return (
            <div>
                <div className = {styles.topBar}>
                    <img className = {styles.logoImage} src={logo} />
                    <div className = {styles.searchBar}>
                        <SearchBar products = {this.state.products} notifySearch = {this.notifySearch} searchText = {this.state.currentSearch}/>
                    </div>
                    <div className = {styles.cart}>
                        <Cart products={this.state.cart} notifyClick={this.onCartClick}/>
                    </div>
                </div>
            {this.loadBody()}
            </div>
            )
    }
}