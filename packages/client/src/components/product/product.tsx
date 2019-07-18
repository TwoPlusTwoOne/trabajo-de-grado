import * as React from 'react'
import * as styles from './product.scss'

export type ProductType = {
  id: number
  name: string
  value: string
  description: string
  sellerId: string
  images: string
}

export type Props = {
  product: ProductType
}

export class Product extends React.PureComponent<Props> {
  render() {
    const { product } = this.props
    const { description, name, value, images } = product
    const image = product.images.split(',')[0] || ''
    return (
      <div className={styles.product}>
        <div className={styles.image}>
          <img src={image} alt={name} />
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{value}</div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    )
  }
}
