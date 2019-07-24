import { Question } from '../entities/Question'
import { Pool } from 'pg';
import { Publication } from '../entities/Pubilcation';


export const insertQuestion = async (pool: Pool, question: Question) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Question.tableName} (question, publication_id, user_id) 
        VALUES ('${question.question}', '${question.publicationId}', '${question.userId}') RETURNING id`
        ).then((res) => {
            return res.rows[0].id
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

export const getPublicationQuestions = async (pool: Pool, publicationId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
            ${Question.tableName}.id, 
            ${Question.tableName}.question, 
            ${Question.tableName}.publication_id,
            ${Question.tableName}.user_id
        FROM ${Question.tableName}
        LEFT OUTER JOIN ${Question.tableName} on ${Publication.tableName}.id = ${Question.tableName}.publication_id
        WHERE ${Publication.tableName}.id = ${publicationId}
        GROUP BY ${Question.tableName}.id
        `
        ).then((res) => {
            return res.rows.map(q => new Question(q.id, q.question, q.publication_id, q.user_id))
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
            ${Question.tableName}.publication_id,
            ${Question.tableName}.user_id
        FROM ${Question.tableName}
        WHERE ${Question.tableName}.id = ${questionID}
        `
        ).then((res) => {
            const q = res.rows[0]
            return new Question(q.id, q.question, q.publication_id, q.user_id)
        }).catch(e => {
            console.error(e.stack)
            return JSON.stringify({ error: e.stack })
        })
    client.release()
    return result
}
