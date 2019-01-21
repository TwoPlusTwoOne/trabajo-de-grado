import { Review } from '../entities/Review'
import { Pool } from 'pg';


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