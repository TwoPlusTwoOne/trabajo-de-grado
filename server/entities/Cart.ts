import { DBEntity } from './DBEntity'
import { Product } from './Product'

class Cart extends DBEntity {

    id: string
    clientID: string
    product: Product

    constructor(id: string, clientID: string, product: Product) {
        super(id)
        this.clientID = clientID
        this.product = product
    }
}

export { Cart }

