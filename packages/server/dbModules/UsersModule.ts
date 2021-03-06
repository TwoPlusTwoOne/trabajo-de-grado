import { User } from '../entities/User'
import { Pool } from 'pg';
import { UserBuilder } from '../builders/UserBuilder';
import { Client } from '../entities/Client';
import { Admin } from '../entities/Admin';

const md5 = require('md5');

const emailRegex = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/

export const insertUser = async (pool: Pool, user: User) => {
    const client = await pool.connect()
    const password = md5(user.password)
    const result: Promise<string> = client.query(
        `INSERT INTO ${User.tableName} (first_name, last_name, direction, dni, password, email, birthdate) 
        VALUES ('${user.first_name}', '${user.last_name}', '${user.direction}', '${user.dni}', '${password}', '${user.email}', '${user.birthdate}')
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

export const updateUser = async (pool: Pool, user: User) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `UPDATE ${User.tableName} SET
        first_name = '${user.first_name}', 
        last_name = '${user.last_name}', 
        direction = '${user.direction}', 
        dni = '${user.dni}',
        password = '${user.password}', 
        email = '${user.email}', 
        birthdate = '${user.birthdate.toISOString()}' 
        WHERE id = ${user.id}
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


export const deleteUser = async (pool: Pool, id: string) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `DELETE FROM ${Client.tableName} 
        WHERE user_id = ${id} ;
        DELETE FROM ${Admin.tableName} 
        WHERE user_id = ${id} ;
        DELETE FROM ${User.tableName} 
        WHERE id = ${id} ;
        `
        ).then((res) => {
                return ""
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

export const getUserById = async (pool: Pool, id:string) => {
    const client = await pool.connect()
    const result: Promise<User> = client.query(
        `SELECT * FROM ${User.tableName} WHERE id = '${id}'`
        ).then((r) => {
            return r.rows[0]
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
            return r.rows[0]
    })
    client.release()
    return result
}

export const validateEmail = (email: string) => {
  if (!email) return false

  return emailRegex.test(email)
}
