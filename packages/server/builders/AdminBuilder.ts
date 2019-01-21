import { UserBuilder } from './UserBuilder'
import { Admin } from '../entities/Admin'
import { Cart } from '../entities/Cart'
import { Role }  from '../entities/Role'

class AdminBuilder extends UserBuilder {

    private role: Role
    private userID: string

    constructor() {
        super()
        this.role = new Role("", "", 0)
        this.userID = ""
    }

    withRole (role: Role) {
        this.role = role
        return this
    }

    withUserId (userID: string) {
        this.userID = userID
        return this
    }

    build() {
        const client  = new Admin(
                            this.id,
                            this.firstName,
                            this.lastName,
                            this.direction,
                            this.dni,
                            this.password,
                            this.email,
                            this.birthdate,
                            this.role,
                            this.userID,
                        )
        return client
    }

}

export { AdminBuilder }