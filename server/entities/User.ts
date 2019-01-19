import { DBEntity } from "./DBEntity";

class User extends DBEntity{

    id: string
    firstName: string
    lastName: string
    direction: string
    dni: string
    password: string
    email: string
    birthdate: Date

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        direction: string,
        dni: string,
        password: string,
        email: string,
        birthdate: Date) {
        super(id)
        this.firstName = firstName,
        this.lastName = lastName,
        this.direction = direction,
        this.dni = dni,
        this.password = password,
        this.email = email,
        this.birthdate = birthdate
    }
}

export { User }