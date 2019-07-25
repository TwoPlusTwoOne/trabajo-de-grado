import { DBEntity } from './DBEntity'
import { Client } from './Client'
import { SellerReview } from './SellerReview'
import { ProductReview } from './ProductReview';

class Product implements DBEntity {

  id: string
  name: string
  reviews: ProductReview[]

  static readonly tableName = 'product_table'

  constructor(
    id: string,
    name: string,
    reviews: ProductReview[]) {
    this.id = id
    this.name = name
    this.reviews = reviews
  }
}

export { Product }
