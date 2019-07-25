import { SellerReview } from '../entities/SellerReview'
import { Pool } from 'pg';
import { ClientBuilder } from '../builders/ClientBuilder';
import { getClientByID } from './ClientModule';
import { ProductReview } from '../entities/ProductReview';
import { Product } from '../entities/Product';
import { getProductByID } from './ProductModule';
import { ProductBuilder } from '../builders/ProductBuilder';
import { Client } from '../entities/Client';


export const insertProductReview = async (pool: Pool, buyer_id: string, product_id: string, description: string, calification: string) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${SellerReview.tableName} (buyer_id, product_id, description, calification) 
        VALUES ('${buyer_id}', '${product_id}', '${description}', '${calification}')
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

export const getProductReviewsForProduct = async (pool: Pool, productId: string) => {
    const client = await pool.connect()
    const result: Promise<ProductReview[]> = client.query(
        `SELECT
            ${ProductReview.tableName}.id,
            ${ProductReview.tableName}.product_id,
            ${ProductReview.tableName}.buyer_id,
            ${ProductReview.tableName}.description,
            ${ProductReview.tableName}.calification
        FROM ${ProductReview.tableName} INNER JOIN product_review_table
        on ${ProductReview.tableName}.product_id = ${Product.tableName}.id
        WHERE ${Product.tableName}.id = ${productId}`
        ).then((res) => {
                return Promise.all(res.rows.map(r => {
                    return getClientByID(pool, r.buyer_id).then((buyer) => {
                        return getProductByID(pool, productId).then((product) => {
                            return new ProductReview(r.id, buyer, product, r.description, r.calification)
                        })
                    })
                }))
        }).catch(e => {
            console.error(e.stack)
            const client = new ClientBuilder().build()
            const product = new ProductBuilder().build()
            return [new ProductReview("", client, product, "", 0)]
        })
    client.release()
    return result
}

export const getProductReviewsForClient = async (pool: Pool, clientId: string) => {
    const client = await pool.connect()
    const result: Promise<ProductReview[]> = client.query(
        `SELECT
            ${ProductReview.tableName}.id,
            ${ProductReview.tableName}.product_id,
            ${ProductReview.tableName}.buyer_id,
            ${ProductReview.tableName}.description,
            ${ProductReview.tableName}.calification
        FROM ${ProductReview.tableName} INNER JOIN product_review_table
        on ${ProductReview.tableName}.id = ${Client.tableName}.id
        WHERE ${Client.tableName}.buyer_id = ${clientId}`
        ).then((res) => {
                return Promise.all(res.rows.map(r => {
                    return getClientByID(pool, clientId).then((buyer) => {
                        return getProductByID(pool, r.product_id).then((product) => {
                            return new ProductReview(r.id, buyer, product, r.description, r.calification)
                        })
                    })
                }))
        }).catch(e => {
            console.error(e.stack)
            const client = new ClientBuilder().build()
            const product = new ProductBuilder().build()
            return [new ProductReview("", client, product, "", 0)]
        })
    client.release()
    return result
}