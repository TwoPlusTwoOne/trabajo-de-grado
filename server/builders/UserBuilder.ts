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

    withLastName(name: string) {
        this.lastName = name
        return this
    }

    withDirection(name: string) {
        this.direction = name
        return this
    }

    withDni(name: string) {
        this.dni = name
        return this
    }

    withPassword(name: string) {
        this.password = name
        return this
    }

    withEmail(name: string) {
        this.email = name
        return this
    }

    withBirthDate(name: Date) {
        this.birthdate = name
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