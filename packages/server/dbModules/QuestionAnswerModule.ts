import { Question } from '../entities/Question'
import {Answer} from '../entities/Answer'
import { Pool } from 'pg';
import {insertQuestion} from './QuestionsModule'
import {insertAnswer} from './AnswerModule'
import { Publication } from '../entities/Pubilcation';

export const getProductQuestionAnswer = async (pool: Pool, productId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
            ${Question.tableName}.id as question_id,
            ${Answer.tableName}.id as answer_id,
            ${Question.tableName}.user_id as client_id,
            ${Answer.tableName}.user_id as seller_id,
            ${Question.tableName}.question,
            ${Answer.tableName}.answer,
            ${Question.tableName}.publication_id  
        FROM ${Question.tableName}
        LEFT OUTER JOIN  ${Publication.tableName} on ${Question.tableName}.publication_id = ${Publication.tableName}.id
        LEFT OUTER JOIN ${Answer.tableName} on ${Question.tableName}.id = ${Answer.tableName}.question_id
        WHERE ${Publication.tableName}.id = ${productId}
        GROUP BY ${Question.tableName}.id, ${Answer.tableName}.id
        `
        ).then((res) => {
            return res.rows.map(r => {
                let answer = {}
                if (r.answer_id != null){
                    answer = new Answer(r.answer_id, r.question_id, r.answer, r.seller_id)
                }
                return {
                    "question": new Question(r.question_id, r.publication_id, r.question, r.client_id),
                    "answer": answer
                }
            })
        }).catch(e => {
            console.error(e.stack)
            return JSON.stringify({ error: e.stack })
        })
    client.release()
    return result
}


export const insertQustionAnswer = async (pool: Pool, question: Question, answer: Answer) => {
    insertQuestion(pool, question).then((qId) => {
        answer.questionId = qId
        insertAnswer(pool, answer)
    })
}