import { Publication } from '../entities/Pubilcation'
import { Product } from '../entities/Product'
import { Client } from '../entities/Client';
import { PublicationImage } from '../entities/PublicationImage';

class PublicationBuilder {

    private id: string
    private name: string
    private value: number
    private product: Product
    private seller: Client
    private images: PublicationImage[] = []
    private description: string

    withName(name: string){
        this.name = name
        return this
    }

    withValue(value: number){
        this.value = value
        return this
    }

    withProduct(product: Product){
        this.product = product
        return this
    }

    withSeller(seller: Client){
        this.seller = seller
        return this
    }

    withDescription(description: string){
        this.description = description
        return this
    }
    
    withImage(image: PublicationImage){
        this.images.push( image )
        return this
    }

    withId(id: string) {
        this.id = id
        return this
    }


    build() {
        const product = new Publication (
                            this.id,
                            this.name,
                            this.value,
                            this.seller,
                            this.images,
                            this.product,
                            this.description
                        )
        return product
    }

}

export { PublicationBuilder }
