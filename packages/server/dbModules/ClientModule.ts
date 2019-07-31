import { Client } from '../entities/Client'
import { insertUser, updateUser } from './UsersModule'
import { User } from '../entities/User'
import { Pool } from 'pg';
import { ClientBuilder } from '../builders/ClientBuilder';


const md5 = require('md5');

export const insertClient = async (pool: Pool, client: Client) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = insertUser(pool, <User>client)
        .then(async (userID) => {
            const result: Promise<string> = clientDB.query(
            `INSERT INTO ${Client.tableName} (seller_calification, user_id) 
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

export const updateClient = async (pool: Pool, client:Client) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = updateUser(pool, <User>client)
        .then(async (userID) => {
            const result: Promise<string> = clientDB.query(
            `UPDATE ${Client.tableName} SET 
            seller_calification = '${client.sellerCalification}', 
            user_id = '${client.userID}'
            WHERE id = ${client.id}
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
    `SELECT 
        first_name, 
        last_name, 
        direction, 
        dni, 
        password, 
        email, 
        birthdate, 
        seller_calification, 
        user_table.id as user_id
    FROM client_table  INNER JOIN user_table
    ON client_table.user_id = user_table.id
    WHERE client_table.id = ${id}`
    ).then((r) => {
            const result = r.rows[0]
            return new Client(id, result.first_name, result.last_name, result.direction, result.dni, result.password, result.email, result.birthdate, result.seller_calification, result.user_id)
    }).catch(e => {
        console.error(e.stack)
        return new ClientBuilder().build()
    })
    clientDB.release()
    return result
}

export const loginClient = async (pool: Pool, email: string, password: string) => {
    const clientDB = await pool.connect()
    const md5Password = md5(password)
    const result: Promise<any> = clientDB.query(
    `SELECT 
        ${Client.tableName}.id as client_id,
        ${User.tableName}.first_name, 
        ${User.tableName}.last_name, 
        ${User.tableName}.direction, 
        ${User.tableName}.dni, 
        ${User.tableName}.password, 
        ${User.tableName}.email, 
        ${User.tableName}.birthdate, 
        ${Client.tableName}.seller_calification, 
        ${User.tableName}.id as user_id
    FROM client_table  INNER JOIN user_table
    ON client_table.user_id = user_table.id
    WHERE ${User.tableName}.email = '${email}'`
    ).then((r) => {
            if(r.rowCount === 0){
                throw new Error("Invalid email")
            }
            else if(r.rows[0].password === md5Password){
                return r.rows[0]
            } else {
                throw new Error("Invalid password")
            }
    })
    clientDB.release()
    return result
}

