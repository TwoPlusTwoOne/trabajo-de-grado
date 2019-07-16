import { DBEntity } from './DBEntity'
import { Client } from './Client'
import { ProductImage } from './ProductImage'
import { Review } from './Review'

class Product implements DBEntity {

    id: string
    name: string
    value: number
    description: string
    seller: Client
    images: ProductImage[]
    reviews: Review[]

    static readonly tableName = "product_table"

    constructor (
        id: string,
        name: string,
        value: number,
        description: string,
        seller: Client,
        images: ProductImage[],
        reviews: Review[]) {
        this.id = id
        this.name = name
        this.value = value
        this.description = description
        this.seller = seller
        this.images = images
        this.reviews = reviews
    }
}

export { Product }