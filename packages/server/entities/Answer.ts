import { DBEntity } from './DBEntity'

class Answer implements DBEntity {

    id: string
    questionId: string
    answer: string
    user: string

    static readonly tableName = "answer_table"

    constructor(id: string, questionId: string, answer: string, user:string) {
        this.id = id
        this.questionId = questionId
        this.answer = answer
        this.user = user
    }
}

export { Answer }

