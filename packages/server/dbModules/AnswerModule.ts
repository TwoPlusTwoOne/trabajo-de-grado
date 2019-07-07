import { Answer } from '../entities/Answer'
import {Question} from '../entities/Question'
import { Pool } from 'pg';
import { json } from 'express';


export const insertAnswer = async (pool: Pool, answer: Answer) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Answer.tableName} (answer, question_id) 
        VALUES ('${answer.answer}', '${answer.questionId}')
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

export const getQuestionAnswer = async (pool: Pool, questionId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
            ${Answer.tableName}.id, 
            ${Answer.tableName}.answer, 
            ${Answer.tableName}.question_id,  
        FROM ${Answer.tableName}
        LEFT OUTER JOIN ${Question.tableName} on ${Question}.tableName}.id = ${Answer.tableName}.question_id
        WHERE ${Question.tableName}.id = ${questionId}
        GROUP BY ${Answer.tableName}.id
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

export const getAnswer = async (pool: Pool, answerID: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
            ${Answer.tableName}.id, 
            ${Answer.tableName}.answer, 
            ${Answer.tableName}.question_id
        FROM ${Answer.tableName}
        WHERE ${Answer.tableName}.id = ${answerID}
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
