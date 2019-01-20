import { UserBuilder } from './UserBuilder'
import { Client } from '../entities/Client'
import { Cart } from '../entities/Cart'
import { Product } from '../entities/Product';

class ClientBuilder extends UserBuilder {

    private sellerCalification: string
    private userID: string
    private cart: Cart

    constructor() {
        super()
        this.sellerCalification = ""
        this.userID = ""
        this.cart = null
    }

    withSellerCalification (sellerCalification: string) {
        this.sellerCalification = sellerCalification
        return this
    }

    withUserId (userID: string) {
        this.userID = userID
        return this
    }

    withCart (cart: Cart) {
        this.cart = cart
        return this
    }

    build() {
        const client  = new Client(
                            this.id,
                            this.firstName,
                            this.lastName,
                            this.direction,
                            this.dni,
                            this.password,
                            this.email,
                            this.birthdate,
                            this.sellerCalification,
                            this.userID,
                            this.cart
                        )
        return client
    }
}

export  { ClientBuilder }