import { DBEntity } from './DBEntity'
import { Product } from './Product';
import { Review } from './Review';
import { Client } from './Client';

class Sale implements DBEntity {

    id: string
    product: Product
    buyer: Client
    reviews: Review[]
    traking_id: string

    static readonly tableName = "sale_table"

    constructor(id: string, product: Product, buyer: Client, reviews: Review[], trakingId: string){
        this.id = id
        this.product = product
        this.buyer = buyer
        this.reviews = reviews
        this.traking_id = trakingId
    }
}

export { Sale }