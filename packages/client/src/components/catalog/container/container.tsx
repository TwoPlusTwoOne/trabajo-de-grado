import * as React from 'react'
import * as styles from './container.scss'
import { ProductComponent } from '../product/product'
import { getProducts } from '../../../api/api'
import Autocomplete from 'react-autocomplete'
import { Product } from '../../../util/types'

export type Props = {
  products: Product[]
}

export type State = {}

export class Container extends React.PureComponent<Props, State> {

  render() {
    return (
        <div className = {styles.container}>
          {
            
            this.props.products.map(p => {
              return <ProductComponent product={p}/>
          })
        }
        </div>
    )
  }
}