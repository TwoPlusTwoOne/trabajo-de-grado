import { User } from '../entities/User'
import { Pool } from 'pg';
import { UserBuilder } from '../builders/UserBuilder';

const md5 = require('md5');

export const insertUser = async (pool: Pool, user: User) => {
    const client = await pool.connect()
    const password = md5(user.password)
    const result: Promise<string> = client.query(
        `INSERT INTO user_table (first_name, last_name, direction, dni, password, email, birthdate) 
        VALUES ('${user.first_name}', '${user.last_name}', '${user.direction}', '${user.dni}', '${password}', '${user.email}', '${user.birthdate.toISOString()}')
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

export const loginUser = async (pool: Pool, email:string, password: string) => {
    const client = await pool.connect()
    const md5Password = md5(password)
    const result: Promise<User> = client.query(
        `SELECT * FROM ${User.tableName} WHERE ${User.tableName}.email = '${email}' AND ${User.tableName}.password = '${md5Password}'`
        ).then((r) => {
                const result = r.rows[0]
                return new User(result.id, result.first_name, result.last_name, result.direction, result.dni, result.password, result.email, result.birthdate)
        }).catch(e => {
            console.error(e.stack)
            return new UserBuilder().build()
        })
    client.release()
    return result
}
