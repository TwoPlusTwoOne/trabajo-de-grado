import { Admin } from '../entities/Admin'
import { insertUser, updateUser } from './UsersModule'
import { User } from '../entities/User'
import { Pool } from 'pg';
import { Role } from '../entities/Role';
import { AdminBuilder } from '../builders/AdminBuilder';
import { updateRole } from './RoleModule';


const md5 = require('md5');


export const insertAdmin = async (pool: Pool, client: Admin) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = insertUser(pool, <User>client)
        .then(async (userID) => {
            const result: Promise<string> = clientDB.query(
            `INSERT INTO ${Admin.tableName} (user_id) 
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

export const updateAdmin = async (pool: Pool, admin: Admin) => {
    const clientDB = await pool.connect()
    const result: Promise<string> = updateUser(pool, <User>admin)
        .then((userID) => {
            return clientDB.query(
            `UPDATE ${Admin.tableName} SET 
            user_id = '${userID}',
            role_id = '${admin.role.id}'
            WHERE id = ${admin.id}
            RETURNING id`
            ).then((res) => {
                    return res.rows[0].id
            }).catch(e => {
                console.error(e.stack)
                return ""
            })
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

export const loginAdmin = async (pool: Pool, email: string, password: string) => {
    const clientDB = await pool.connect()
    const md5Password = md5(password)
    const result: Promise<Admin> = clientDB.query(
    `SELECT 
        ${Admin.tableName}.id as admin_id,
        ${User.tableName}.first_name, 
        ${User.tableName}.last_name, 
        ${User.tableName}.direction, 
        ${User.tableName}.dni, 
        ${User.tableName}.password, 
        ${User.tableName}.email, 
        ${User.tableName}.birthdate, 
        ${Role.tableName}.id as role_id,
        ${Role.tableName}.name as role_name,
        ${Role.tableName}.level as role_level,
        ${User.tableName}.id as user_id
        FROM ${Admin.tableName} INNER JOIN ${User.tableName}
        ON ${Admin.tableName}.user_id = ${User.tableName}.id
        FULL OUTER JOIN role_table
        ON ${Role.tableName}.id = ${Admin.tableName}.role_id
        WHERE ${User.tableName}.email = '${email}' AND ${User.tableName}.password = '${md5Password}'`
    ).then((r) => {
        return r.rows[0]
    })
    clientDB.release()
    return result
}