import { Admin } from '../entities/Admin'
import { insertUser } from './UsersModule'
import { User } from '../entities/User'
import { Pool } from 'pg';


const md5 = require('md5');


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
    clientDB.release()
    return result
}

export const getAdminByID = async (pool: Pool, id: string) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = clientDB.query(
    `SELECT 
    first_name, 
    last_name, 
    direction, 
    dni, 
    password, 
    email, 
    birthdate, 
    role_table.name as role-name
    role_table.level as role-level 
    FROM admin_table  INNER JOIN user_table
    ON client_table.user_id = user_table.id
    INNER JOIN role_table
    ON role_table.id = admin_table.role_id
    WHERE client_table.id = ${md5(id)}`
    ).then((res) => {
            return res.rows[0]
    }).catch(e => {
        console.error(e.stack)
        return ""
    })
    clientDB.release()
    return result
}