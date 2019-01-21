import { DBEntity } from './DBEntity'
import { Product } from './Product'

class Cart implements DBEntity {

    id: string
    clientID: string
    product: Product

    constructor(id: string, clientID: string, product: Product) {
        this.id = id
        this.clientID = clientID
        this.product = product
    }
}

export { Cart }

