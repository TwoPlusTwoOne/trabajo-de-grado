import { DBEntity } from './DBEntity'
import { Publication } from './Pubilcation';

class Cart implements DBEntity {

    id: string
    clientID: string
    publications: Publication[]
    tableName: string

    static readonly tableName = "cart_table"

    constructor(id: string, clientID: string, publications: Publication[]) {
        this.id = id
        this.clientID = clientID
        this.publications = publications
    }
}

export { Cart }

