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
    return result
}