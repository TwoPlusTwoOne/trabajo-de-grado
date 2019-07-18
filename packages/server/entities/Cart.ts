import { DBEntity } from './DBEntity'
import { Product } from './Product'

class Cart implements DBEntity {

    id: string
    clientID: string
    products: Product[]
    tableName: string

    static readonly tableName = "cart_table"

    constructor(id: string, clientID: string, products: Product[]) {
        this.id = id
        this.clientID = clientID
        this.products = products
    }
}

export { Cart }

