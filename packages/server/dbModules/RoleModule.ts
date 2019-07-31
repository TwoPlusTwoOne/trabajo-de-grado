import { Role } from '../entities/Role'
import { Pool } from 'pg';


export const insertRole = async (pool: Pool, role: Role) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Role.tableName} (name, level) 
        VALUES ('${role.name}', '${role.level}')
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

export const updateRole = async (pool: Pool, role: Role) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `UPDATE ${Role.tableName} SET
        name = ${role.name}, 
        level = ${role.level}
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