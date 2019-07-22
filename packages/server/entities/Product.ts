import { DBEntity } from './DBEntity'
import { Client } from './Client'
import { Review } from './Review'

class Product implements DBEntity {

  id: string
  name: string
  reviews: Review[]

  static readonly tableName = 'product_table'

  constructor(
    id: string,
    name: string,
    reviews: Review[]) {
    this.id = id
    this.name = name
    this.reviews = reviews
  }
}

export { Product }
