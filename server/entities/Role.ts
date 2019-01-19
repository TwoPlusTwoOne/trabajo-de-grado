import { DBEntity } from './DBEntity'

class Role extends DBEntity {

    id: string
    name: string
    level: number

    constructor(id: string, name: string, level: number){
        super(id)
        this.name = name
        this.level = level
    }
}

export { Role }