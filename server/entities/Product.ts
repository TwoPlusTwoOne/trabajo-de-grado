import { DBEntity } from './DBEntity'
import { Client } from './Client'
import { ProductImage } from './ProductImage'
import { Review } from './Review'

class Product extends DBEntity {

    id: string
    name: string
    value: number
    description: string
    seller: Client
    images: ProductImage[]
    reviews: Review[]

    constructor (
        id: string,
        name: string,
        value: number,
        description: string,
        seller: Client,
        images: ProductImage[],
        reviews: Review[]) {
        super(id)
        this.name = name
        this.value = value,
        this.description = description,
        this.seller = seller
        this.images = images
        this.reviews = reviews
    }
}

export { Product }