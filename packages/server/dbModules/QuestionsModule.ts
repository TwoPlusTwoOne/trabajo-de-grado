import { Question } from '../entities/Question'
import {Product} from '../entities/Product'
import { Pool } from 'pg';


export const insertQuestion = async (pool: Pool, question: Question) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Question.tableName} (question, product_id, user_id) 
        VALUES ('${question.question}', '${question.productId}', '${question.userId}') RETURNING id`
        ).then((res) => {
            return res.rows[0].id
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

export const getProductQuestions = async (pool: Pool, productId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
            ${Question.tableName}.id, 
            ${Question.tableName}.question, 
            ${Question.tableName}.product_id,
            ${Question.tableName}.user_id
        FROM ${Question.tableName}
        LEFT OUTER JOIN ${Question.tableName} on ${Product.tableName}.id = ${Question.tableName}.product_id
        WHERE ${Product.tableName}.id = ${productId}
        GROUP BY ${Question.tableName}.id
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

export const getQuestion = async (pool: Pool, questionID: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
            ${Question.tableName}.id, 
            ${Question.tableName}.question, 
            ${Question.tableName}.product_id,
            ${Question.tableName}.user_id
        FROM ${Question.tableName}
        WHERE ${Question.tableName}.id = ${questionID}
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
