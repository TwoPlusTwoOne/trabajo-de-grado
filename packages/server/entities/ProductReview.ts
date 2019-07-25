import { DBEntity } from './DBEntity'
import { Client } from './Client'
import { Product } from './Product'

class ProductReview implements DBEntity{

    id: string
    product: Product
    buyer: Client
    description: string
    calification: number

    static readonly tableName = "product_review_table"

    constructor(id: string, buyer: Client, product: Product, description: string, calification: number) {
        this.id = id
        this.buyer = buyer
        this.product = product
        this.description = description
        this.calification = calification
    }
}

export { ProductReview }