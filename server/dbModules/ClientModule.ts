import { Client } from '../entities/Client'
import { insertUser } from './UsersModule'
import { User } from '../entities/User'
import { Pool } from 'pg';


export const insertClient = async (pool: Pool, client: Client) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = insertUser(pool, <User>client)
        .then(async (userID) => {
            const result: Promise<string> = clientDB.query(
            `INSERT INTO client_table (seller_calification, user_id) 
            VALUES ('${client.sellerCalification}', '${userID}')
            RETURNING id`
            ).then((res) => {
                    return res.rows[0].id
            }).catch(e => {
                console.error(e.stack)
                return ""
            })
        return result
        })
    clientDB.release()
    return result
}

export const getClientByID = async (pool: Pool, id: string) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = clientDB.query(
    `SELECT first_name, last_name, direction, dni, password, email, birthdate, seller_calification
    FROM client_table  INNER JOIN user_table
    ON client_table.user_id = user_table.id
    WHERE client_table.id = ${id}`
    ).then((res) => {
            return res.rows[0]
    }).catch(e => {
        console.error(e.stack)
        return ""
    })
    clientDB.release()
    return result


}