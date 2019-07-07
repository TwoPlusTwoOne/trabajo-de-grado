import { DBEntity } from './DBEntity'
import { Client } from './Client'

class Review implements DBEntity{

    id: string
    buyer: Client
    description: string
    calification: number

    static readonly tableName = "review_table"

    constructor(id: string, buyer: Client, description: string, calification: number) {
        this.id = id
        this.buyer = buyer
        this.description = description
        this.calification = calification
    }
}

export { Review }