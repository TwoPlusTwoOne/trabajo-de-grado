import { DBEntity } from './DBEntity'
import { Product } from './Product';
import { SellerReview } from './SellerReview';
import { Client } from './Client';
import { Publication } from './Pubilcation';

class Sale implements DBEntity {

    id: string
    publication: Publication
    buyer: Client
    price: number
    traking_id: string

    static readonly tableName = "sale_table"

    constructor(id: string, publication: Publication, buyer: Client, price:number, trakingId: string){
        this.id = id
        this.publication = publication
        this.buyer = buyer
        this.price = price
        this.traking_id = trakingId
    }
}

export { Sale }