import { Review } from '../entities/Review'
import { Pool } from 'pg';
import { REFUSED } from 'dns';
import { ClientBuilder } from '../builders/ClientBuilder';


export const insertReview = async (pool: Pool, review: Review) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO review_table (buyer_id, description, calification) 
        VALUES ('${review.buyer.id}', '${review.description}', '${review.calification}')
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

export const getReviewsForProduct = async (pool: Pool, productId: string) => {
    const client = await pool.connect()
    const result: Promise<Review[]> = client.query(
        `SELECT
            ${Review.tableName}.id,
            ${Review.tableName}.buyer_id,
            ${Review.tableName}.description,
            ${Review.tableName}.calification
        FROM ${Review.tableName} INNER JOIN product_review_table
        on ${Review.tableName}.id = product_review_table.review_id
        WHERE product_review_table.product_id = ${productId}`
        ).then((res) => {
                return res.rows.map(r => {
                    const client = new ClientBuilder().withID(r.buyer_id).build()
                    return new Review(r.id, client, r.description, r.calification)
                })
        }).catch(e => {
            console.error(e.stack)
            return [new Review("", new ClientBuilder().build(), "", 0)]
        })
    client.release()
    return result
}