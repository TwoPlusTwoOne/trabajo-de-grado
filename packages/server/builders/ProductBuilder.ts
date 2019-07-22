import { Product } from '../entities/Product'
import { Review } from '../entities/Review';

class ProductBuilder {

    private id: string
    private name: string
    private reviews: Review[] = []

    withName(name: string){
        this.name = name
        return this
    }

    withDescription(description: string){
        this.description = description
        return this
    }

    withReview(review: Review){
        this.reviews.push( review )
        return this
    }

    withId(id: string) {
        this.id = id
        return this
    }


    build() {
        const product = new Product (
                            this.id,
                            this.name,
                            this.reviews
                        )
        return product
    }

}

export { ProductBuilder }
