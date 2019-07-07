import { DBEntity } from './DBEntity'

class Answer implements DBEntity {

    id: string
    questionId: string
    answer: string

    static readonly tableName = "answer_table"

    constructor(id: string, questionId: string, answer: string) {
        this.id = id
        this.questionId = questionId
        this.answer = answer
    }
}

export { Answer }

