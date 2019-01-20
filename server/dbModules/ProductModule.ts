import { Product } from '../entities/Product'
import { Pool } from 'pg';
import { json } from 'express';


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


export const getAllProducts = async (pool: Pool) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT product_table.id, product_table.name, product_table.value, product_table.description, product_image_table.image
        FROM product_image_table
        LEFT OUTER JOIN product_table on product_image_table.product_id = product_table.id`
        ).then((res) => {
            return res.rows
        }).catch(e => {
            console.error(e.stack)
            return JSON.stringify({ error: e.stack })
        })
    client.release()
    return result
}
