import { DBEntity } from './DBEntity'

class ProductImage implements DBEntity {

    id: string
    image: string
    productID: string

    constructor(id: string, image: string, productID: string) {
        this.id = id
        this.image = image
        this.productID = productID
    }
}

export { ProductImage }