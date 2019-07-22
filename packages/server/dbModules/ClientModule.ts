import { Client } from '../entities/Client'
import { insertUser } from './UsersModule'
import { User } from '../entities/User'
import { Pool } from 'pg';
import { ClientBuilder } from '../builders/ClientBuilder';


const md5 = require('md5');

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
    const result: Promise<Client> = clientDB.query(
    `SELECT first_name, last_name, direction, dni, password, email, birthdate, seller_calification, user_table.id as user_id
    FROM client_table  INNER JOIN user_table
    ON client_table.user_id = user_table.id
    WHERE client_table.id = ${md5(id)}`
    ).then((r) => {
            const result = r.rows[0]
            return new Client(id, result.first_name, result.last_name, result.direction, result.dni, result.password, result.email, result.birthdate, result.sellerCalification, result.user_id)
    }).catch(e => {
        console.error(e.stack)
        return new ClientBuilder().build()
    })
    clientDB.release()
    return result
}