import { DBEntity } from './DBEntity'

class Question implements DBEntity {

    id: string
    productId: string
    question: string

    static readonly tableName = "question_table"

    constructor(id: string, productId: string, question: string) {
        this.id = id
        this.productId = productId
        this.question = question
    }
}

export { Question }

