import * as React from 'react'
import { Container } from '../catalog/container/container'
import { getProducts, getCart } from '../../api/api'
import { Product, Cart as CartObject } from '../../util/types'
import { Loader } from '../loader/loader'
import { SearchBar } from '../catalog/searchBar/searchBar'
import styles from './superComponent.scss'
import logo from '../../mercado-livre-logo.png'
import { Cart } from "../cart/cart";

    export type Props = {
        clientId:string
    }

    export type State = {
    products: Product[],
    searchedProducts: Product[],
    cart: CartObject,
    currentSearch: string
    }

export class SuperComponent extends React.PureComponent<Props, State> {

    state: State = {
        products: [],
        searchedProducts: [],
        cart: {
            id: "",
            clientId: "",
            products: []
        },
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

        getCart(this.props.clientId)
        .then(response => response.json() as Promise<CartObject>)
        .then(cart => this.setState({ ...this.state, cart: cart}))

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
                    <div className = {styles.cart}>
                        <Cart products={this.state.cart.products} notifyClick={this.onCartClick}/>
                    </div>
                </div>
            {this.loadBody()}
            </div>
            )
    }
}
