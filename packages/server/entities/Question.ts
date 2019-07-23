import { DBEntity } from './DBEntity'

class Question implements DBEntity {

    id: string
    productId: string
    question: string
    userId: string

    static readonly tableName = "question_table"

    constructor(id: string, productId: string, question: string, userId: string) {
        this.id = id
        this.productId = productId
        this.question = question
        this.userId = userId
    }
}

export { Question }

