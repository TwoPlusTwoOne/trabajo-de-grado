import { Answer } from '../entities/Answer'
import {Question} from '../entities/Question'
import { Pool } from 'pg';


export const insertAnswer = async (pool: Pool, answer: Answer) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Answer.tableName} (answer, question_id, user_id) 
        VALUES ('${answer.answer}', '${answer.questionId}', '${answer.user}')
        RETURNING id`
        ).then((res) => {
            return res.rows[0].id
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}


export const getAnswer = async (pool: Pool, answerID: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
            ${Answer.tableName}.id, 
            ${Answer.tableName}.answer, 
            ${Answer.tableName}.question_id,
            ${Answer.tableName}.user_id
        FROM ${Answer.tableName}
        WHERE ${Answer.tableName}.id = ${answerID}
        `
        ).then((res) => {
            const a = res.rows[0]
            return new Answer(a.id, a.answer, a.question_id, a.user_id)
        }).catch(e => {
            console.error(e.stack)
            return JSON.stringify({ error: e.stack })
        })
    client.release()
    return result
}
