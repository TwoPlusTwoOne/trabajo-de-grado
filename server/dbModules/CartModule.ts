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