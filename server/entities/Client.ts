import { User } from './User'
import { Cart } from './Cart'

class Client extends User{
    id: string
    firstNma: string 
    lastName: string
    direction: string
    dni: string
    password: string
    email: string
    birthdate: Date
    sellerCalification: string
    userID: string
    cart: Cart

    constructor(
        id: string,
        firstNma: string, 
        lastName: string,
        direction: string,
        dni: string,
        password: string,
        email: string,
        birthdate: Date,
        sellerCalification: string,
        userID: string,
        cart: Cart) {
        super(id, firstNma, lastName, direction, dni, password, email, birthdate)
        this.sellerCalification = sellerCalification
        this.userID = userID
        this.cart = cart
    }
}

export { Client }