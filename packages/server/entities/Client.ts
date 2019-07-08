import { User } from './User'

class Client extends User {
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

    static readonly tableName = "client_table"

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
        userID: string) {
        super(id, firstNma, lastName, direction, dni, password, email, birthdate)
        this.sellerCalification = sellerCalification
        this.userID = userID
    }
}

export { Client }