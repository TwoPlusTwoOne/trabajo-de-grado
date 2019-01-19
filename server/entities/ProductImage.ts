import { DBEntity } from './DBEntity'

class ProductImage extends DBEntity {

    id: string
    image: string
    productID: string

    constructor(id: string, image: string, productID: string) {
        super(id)
        this.image = image
        this.productID = productID
    }
}

export { ProductImage }