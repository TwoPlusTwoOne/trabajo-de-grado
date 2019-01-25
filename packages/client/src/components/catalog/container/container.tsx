import * as React from 'react'
import * as styles from './container.scss'
import { ProductComponent } from '../product/product'
import { getProducts } from '../../../api/api'

export type Product = {
  id: string
  description: string
  images: string
  name: string
  value: number
}

export type Props = {}

export type State = {
  products: Product[]
}

export class Container extends React.PureComponent<Props, State> {
  state: State = {
    products: []
  }

  constructor(props: any) {
    super(props)
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
    .then(prods => this.setState({ ...this.state, products: prods }))

  }


  render() {
    return (
      <div>
        {
          
          this.state.products.map(p => {
            return <ProductComponent product={p}/>
          })
        }
        <div />
      </div>
    )
  }
}