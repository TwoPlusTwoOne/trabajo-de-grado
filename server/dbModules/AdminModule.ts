import { Admin } from '../entities/Admin'
import { insertUser } from './UsersModule'
import { User } from '../entities/User'
import { Pool } from 'pg';


export const insertAdmin = async (pool: Pool, client: Admin) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = insertUser(pool, <User>client)
        .then(async (userID) => {
            const result: Promise<string> = clientDB.query(
            `INSERT INTO admin_table (user_id) 
            VALUES ('${userID}')
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