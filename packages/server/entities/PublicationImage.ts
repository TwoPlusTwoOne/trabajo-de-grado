import { DBEntity } from './DBEntity'

class PublicationImage implements DBEntity {

    id: string
    image: string
    publicationID: string

    static readonly tableName = "publication_image_table"

    constructor(id: string, image: string, publicationID: string) {
        this.id = id
        this.image = image
        this.publicationID = publicationID
    }
}

export { PublicationImage }