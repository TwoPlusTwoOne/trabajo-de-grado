import { DBEntity } from "./DBEntity";

class User implements DBEntity{

    id: string
    first_name: string
    last_name: string
    direction: string
    dni: string
    password: string
    email: string
    birthdate: Date

    static tableName = "user_table"

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        direction: string,
        dni: string,
        password: string,
        email: string,
        birthdate: Date) {
        this.id = id
        this.first_name = firstName
        this.last_name = lastName
        this.direction = direction
        this.dni = dni
        this.password = password
        this.email = email
        this.birthdate = birthdate
    }
}

export { User }