import { User } from '../entities/User'

class UserBuilder {

    protected id: string
    protected firstName: string
    protected lastName: string
    protected direction: string
    protected dni: string
    protected password: string
    protected email: string
    protected birthdate: Date

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
        return this
    }

    withLastName(lastName: string) {
        this.lastName = lastName
        return this
    }

    withDirection(direction: string) {
        this.direction = direction
        return this
    }

    withDni(dni: string) {
        this.dni = dni
        return this
    }

    withPassword(password: string) {
        this.password = password
        return this
    }

    withEmail(email: string) {
        this.email = email
        return this
    }

    withBirthDate(birthdate: Date) {
        this.birthdate = birthdate
        return this
    }

    withID(id: string) {
        this.id = id
        return this
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