import { Product } from '../entities/Product'
import { SellerReview } from '../entities/SellerReview';

class ProductBuilder {

    private id: string
    private name: string
    private reviews: SellerReview[] = []

    withName(name: string){
        this.name = name
        return this
    }


    withReview(review: SellerReview){
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
