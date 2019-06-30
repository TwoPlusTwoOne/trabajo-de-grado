import * as React from 'react'

export type ProductType = {
  id: number
  name: string
  value: string
  description: string
  sellerId: string
}

export type Props = {
  product: ProductType
}

export class Product extends React.PureComponent<Props> {
  render() {
    const { product } = this.props
    const { description, name, value } = product
    return (
      <div>
        <div>{name}</div>
        <div>{value}</div>
        <div>{description}</div>
      </div>
    )
  }
}