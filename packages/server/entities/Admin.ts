import { User } from './User'
import { Role } from './Role'

class Admin extends User{
    id: string
    firstNma: string
    lastName: string
    direction: string
    dni: string
    password: string
    email: string
    birthdate: Date
    role: Role
    userID: string

    constructor(
        id: string,
        firstNma: string,
        lastName: string,
        direction: string,
        dni: string,
        password: string,
        email: string,
        birthdate: Date,
        role: Role,
        userID: string) {
        super(id, firstNma, lastName, direction, dni, password, email, birthdate)
        this.role = role
        this.userID = userID
    }
}

export { Admin }