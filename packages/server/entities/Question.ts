import { DBEntity } from './DBEntity'

class Question implements DBEntity {

    id: string
    publicationId: string
    question: string
    userId: string

    static readonly tableName = "question_table"

    constructor(id: string, publicationId: string, question: string, userId: string) {
        this.id = id
        this.publicationId = publicationId
        this.question = question
        this.userId = userId
    }
}

export { Question }

