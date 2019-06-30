import * as React from 'react'
import * as styles from './container.scss'
import { ProductComponent } from '../product/product'
import { getProducts } from '../../../api/api'
import Autocomplete from 'react-autocomplete'
import { Product } from '../../../util/types'

export type Props = {
  products: Product[]
}

export type State = {
  productsNames: [],
  value: string
}

export class Container extends React.PureComponent<Props, State> {
  state: State = {
    productsNames: [],
    value: ""
  }

  constructor(props: any) {
    super(props)
    console.log(props.products)
    const products = props.products
    const prodNames = products.map((p:Product) => p.name)
    this.setState({ ...this.state, productsNames: prodNames, value: "" })

  }


   matchStateToTerm(state: Product, value: string) {
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  render() {
    return (
      <div>
        <Autocomplete
          value={this.state.value}
          inputProps={{ id: 'states-autocomplete' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={this.props.products}
          shouldItemRender={this.matchStateToTerm}
          getItemValue={(item) => item.name}
          onChange={(event, newvalue) => this.setState({ ...this.state, value: newvalue })}
          onSelect={newvalue => this.setState({ ...this.state, value: newvalue })}
          renderMenu={children => (
            <div className="menu">
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.id}
            >{item.name}</div>
          )}
        />
        <div className = {styles.container}>
          {
            
            this.props.products.map(p => {
              if(this.matchStateToTerm(p, this.state.value)){
                return <ProductComponent product={p}/>
              }
          })
        }
        </div>
      </div>
    )
  }
}