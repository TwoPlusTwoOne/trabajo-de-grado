import { User } from '../entities/User'

class UserBuilder {

    id: string
    firstName: string
    lastName: string
    direction: string
    dni: string
    password: string
    email: string
    birthdate: Date

    constructor () {
        this.id = ""
        this.firstName= ""
        this.lastName= ""
        this.direction= ""
        this.dni= ""
        this.password= ""
        this.email= ""
        this.birthdate = new Date()
    }


    withFirstName(name: string) {
        this.firstName = name
        this
    }

    withLastName(name: string) {
        this.lastName = name
        this
    }

    withDirection(name: string) {
        this.direction = name
        this
    }

    withDni(name: string) {
        this.dni = name
        this
    }

    withPassword(name: string) {
        this.password = name
        this
    }

    withEmail(name: string) {
        this.email = name
        this
    }

    withBirthDate(name: Date) {
        this.birthdate = name
        this
    }

    build() {
        const user  = new User (
                        this.id,
                        this.firstName,
                        this.lastName,
                        this.direction,
                        this.dni,
                        this.password,
                        this.email,
                        this.birthdate
                    )
        return user
    }
}

export { UserBuilder }