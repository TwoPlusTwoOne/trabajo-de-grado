import { DBEntity } from './DBEntity'
import { Client } from './Client'

class Review extends DBEntity{

    id: string
    buyer: Client
    description: string
    calification: number

    constructor(id: string, buyer: Client, description: string, calification: number) {
        super(id)
        this.buyer = buyer
        this.description = description
        this.calification = calification
    }
}

export { Review }