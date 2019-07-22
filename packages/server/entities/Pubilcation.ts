import { DBEntity } from './DBEntity'
import { Client } from './Client'
import { PublicationImage } from './PublicationImage'
import {Product} from './Product'

class Publication implements DBEntity {

    id: string
    name: string
    value: number
    seller: Client
    images: PublicationImage[]
    product: Product
    description: string

    static readonly tableName = "publication_table"

    constructor (
        id: string,
        name: string,
        value: number,
        seller: Client,
        images: PublicationImage[],
        product: Product,
        description: string) {
        this.id = id
        this.name = name
        this.value = value
        this.seller = seller
        this.images = images
        this.product = product
        this.description = description
    }
}

export { Publication }
