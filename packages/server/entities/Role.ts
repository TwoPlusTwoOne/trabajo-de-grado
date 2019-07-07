import { DBEntity } from './DBEntity'

class Role implements DBEntity {

    id: string
    name: string
    level: number

    static readonly tableName = "role_table"

    constructor(id: string, name: string, level: number){
        this.id = id
        this.name = name
        this.level = level
    }
}

export { Role }