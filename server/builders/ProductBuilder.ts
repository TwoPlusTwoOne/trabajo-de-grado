import { Product } from '../entities/Product'
import { Client } from '../entities/Client';
import { ProductImage } from '../entities/ProductImage';
import { Review } from '../entities/Review';

class ProductBuilder {

    id: string
    name: string
    value: number
    description: string
    seller: Client
    images: ProductImage[]
    reviews: Review[]

    withName(name: string){
        this.name = name
        return this
    }

    withValue(value: number){
        this.value = value
        return this
    }

    withDescription(description: string){
        this.description = description
        return this
    }

    withSeller(seller: Client){
        this.seller = seller
        return this
    }

    withImage(image: ProductImage){
        this.images.push( image )
        return this
    }

    withReview(review: Review){
        this.reviews.push( review )
        return this
    }


    build() {
        const product = new Product (
                            this.id,
                            this.name,
                            this.value,
                            this.description,
                            this.seller,
                            this.images,
                            this.reviews
                        )
        return product
    }

}

export { ProductBuilder }