import { User } from '../entities/User'
import { Pool } from 'pg';


export const insertUser = async (pool: Pool, user: User) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO user_table (first_name, last_name, direction, dni, password, email, birthdate) 
        VALUES ('${user.firstName}', '${user.lastName}', '${user.direction}', '${user.dni}', '${user.password}', '${user.email}', '${user.birthdate}')
        RETURNING id`
        ).then((res) => {
                return res.rows[0].id
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    return result
}