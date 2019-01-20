import { Product } from '../entities/Product'
import { Pool } from 'pg';


export const insertProduct = async (pool: Pool, product: Product) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO product_table (name, value, description, seller_id) 
        VALUES ('${product.name}', '${product.value}', '${product.description}', '${product.seller.id}')
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
