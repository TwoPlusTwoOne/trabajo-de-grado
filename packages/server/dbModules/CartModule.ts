import { Cart } from '../entities/Cart'
import { Pool } from 'pg';


export const insertCart = async (pool: Pool, cart: Cart) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO cart_table (client_id, product_id) 
        VALUES ('${cart.clientID}', '${cart.product}')
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

export const getCartByClientId = async (pool: Pool, cart: Cart) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT 
        product_table.id as product_id, 
        product_table.description as product_description, 
        product_table.name as product_name, 
        product_table.value as product_value, 
        product_table.description as product_description, 
        user_table.first_name as seller_first_name, 
        user_table.last_name as seller_last_name, 
        client_table.seller_calification, 
        user_table.id as seller_id
        FROM cart_table INNER JOIN product_table
        on cart_table.product_id = product_table.id
        INNER JOIN client_table
        on client_table.id = product_table.seller_id
        INNER JOIN user_table
        on user_table.id = client_table.user_id`
        ).then((res) => {
                return res.rows
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

