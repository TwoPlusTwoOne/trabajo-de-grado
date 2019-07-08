import { DBEntity } from './DBEntity'

class Question implements DBEntity {

    id: string
    productId: string
    question: string
    user: string

    static readonly tableName = "question_table"

    constructor(id: string, productId: string, question: string, user: string) {
        this.id = id
        this.productId = productId
        this.question = question
        this.user = user
    }
}

export { Question }

