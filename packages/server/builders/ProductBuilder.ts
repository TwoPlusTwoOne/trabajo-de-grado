import { Product } from '../entities/Product'
import { ProductReview } from '../entities/ProductReview';

class ProductBuilder {

    private id: string
    private name: string
    private reviews: ProductReview[] = []

    withName(name: string){
        this.name = name
        return this
    }


    withReview(review: ProductReview){
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
