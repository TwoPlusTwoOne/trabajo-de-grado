import { getProductByID } from './ProductModule'
import { getClientByID } from './ClientModule'
import { Pool } from 'pg';
import {Sale} from '../entities/Sale'
import { Product } from '../entities/Product';
import { Client } from '../entities/Client';
import { SellerReview } from '../entities/SellerReview';
import { ProductBuilder } from '../builders/ProductBuilder';
import { ClientBuilder } from '../builders/ClientBuilder';

export const insertSale = async (pool: Pool, product_id: string, buyer_id:string, traking_id: string) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Sale.tableName} (product_id, buyer_id, traking_id) 
        VALUES ('${product_id}', '${buyer_id}', '${traking_id}')
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

export const getSale = async (pool: Pool, id: string) => {
    const client = await pool.connect()
    const result: Promise<Sale> = client.query(
        `
        SELECT *
        FROM ${Sale.tableName}
        WHERE id = ${id}`
        ).then((res) => {
                const r = res.rows[0]
                return getProductByID(pool, r.product_id).then ((product: Product) => {
                    return getClientByID(pool, r.buyer_id).then((client: Client) => {
                        return new Sale(id, product, client, r.traking_id)
                    })
                })
        }).catch(e => {
            console.error(e.stack)
            return new Sale("", new ProductBuilder().build(), new ClientBuilder().build(), "")
        })
    client.release()
    return result
}