import * as React from 'react'
import * as styles from './product.scss'
import { Product } from '../../../util/types'

export type Props = {
  product: Product
  onClick: (product: Product) => void
}

export const ProductComponent = (props: Props) => {
  const { product, onClick } = props
  return <div onClick={() => onClick(product)} className={styles.container}>
    <img alt={product.name} className={styles.img} src={product.images[0]} />
    <label>${product.value}</label>
    <div />
  </div>
}
