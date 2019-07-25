import { DBEntity } from './DBEntity'
import { Product } from './Product';
import { SellerReview } from './SellerReview';
import { Client } from './Client';

class Sale implements DBEntity {

    id: string
    product: Product
    buyer: Client
    traking_id: string

    static readonly tableName = "sale_table"

    constructor(id: string, product: Product, buyer: Client, trakingId: string){
        this.id = id
        this.product = product
        this.buyer = buyer
        this.traking_id = trakingId
    }
}

export { Sale }