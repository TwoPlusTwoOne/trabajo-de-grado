import { DBEntity } from './DBEntity'
import { Client } from './Client'

class SellerReview implements DBEntity{

    id: string
    buyer: Client
    seller: Client
    description: string
    calification: number

    static readonly tableName = "seller_review_table"

    constructor(id: string, buyer: Client, seller: Client, description: string, calification: number) {
        this.id = id
        this.buyer = buyer
        this.seller = seller
        this.description = description
        this.calification = calification
    }
}

export { SellerReview }