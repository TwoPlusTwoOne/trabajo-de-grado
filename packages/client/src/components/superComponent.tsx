import * as React from 'react'
import { Container } from './catalog/container/container'
import { getProducts } from '../api/api'
import { Product } from '../util/types'
import { Loader } from './loader/loader'
export type Props = {}
  
  export type State = {
    products: Product[]
  }

export class SuperComponent extends React.PureComponent<Props, State> {

    state: State = {
        products: []
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
        .then(prods => this.setState({ ...this.state, products: prods}))
    }

    loadBody() {
        if (this.state.products.length === 0) {
            return <Loader/>     
        }else {
            return <Container products= {this.state.products}/>
        }
    }
    
    render() { 
        return (
            <div>
            {this.loadBody()}
            </div>
            )
    }
}