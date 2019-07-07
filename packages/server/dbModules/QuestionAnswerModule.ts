import { Question } from '../entities/Question'
import {Answer} from '../entities/Answer'
import {Product} from '../entities/Product'
import { Pool } from 'pg';
import {insertQuestion} from './QuestionsModule'
import {insertAnswer} from './AnswerModule'

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
            ${Question.tableName}.product_id  
        FROM ${Question.tableName}
        LEFT OUTER JOIN  ${Product.tableName} on ${Question.tableName}.product_id = ${Product.tableName}.id
        LEFT OUTER JOIN ${Answer.tableName} on ${Question.tableName}.id = ${Answer.tableName}.question_id
        WHERE ${Product.tableName}.id = ${productId}
        GROUP BY ${Question.tableName}.id, ${Answer.tableName}.id
        `
        ).then((res) => {
            return res.rows
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