import { SellerReview } from '../entities/SellerReview'
import { Pool } from 'pg';
import { ClientBuilder } from '../builders/ClientBuilder';
import { getClientByID } from './ClientModule';
import { Client } from '../entities/Client';


export const insertSellerReview = async (pool: Pool, buyer_id: string, seller_id: string, description: string, calification: string) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${SellerReview.tableName} (buyer_id, seller_id, description, calification) 
        VALUES ('${buyer_id}', '${seller_id}', '${description}', '${calification}')
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

export const getSellerReviewsForSeller = async (pool: Pool, seller_id: string) => {
    const client = await pool.connect()
    const result: Promise<SellerReview[]> = client.query(
        `SELECT
            ${SellerReview.tableName}.id,
            ${SellerReview.tableName}.buyer_id,
            ${SellerReview.tableName}.seller_id,
            ${SellerReview.tableName}.description,
            ${SellerReview.tableName}.calification
        FROM ${SellerReview.tableName}
        WHERE ${SellerReview}.seller_id = ${seller_id}`
        ).then((res) => {
                return Promise.all(res.rows.map(r => {
                    return getClientByID(pool, r.buyer_id).then((buyer) => {
                        return getClientByID(pool, seller_id).then((seller) => {
                            return new SellerReview(r.id, buyer, seller, r.description, r.calification)
                        })
                    })
                }))
        }).catch(e => {
            console.error(e.stack)
            const aux = new ClientBuilder().build()
            return [new SellerReview("", aux, aux, "", 0)]
        })
    client.release()
    return result
}


export const getSellerReviewsForClient = async (pool: Pool, cleintId: string) => {
    const client = await pool.connect()
    const result: Promise<SellerReview[]> = client.query(
        `SELECT
            ${SellerReview.tableName}.id,
            ${SellerReview.tableName}.buyer_id,
            ${SellerReview.tableName}.seller_id,
            ${SellerReview.tableName}.description,
            ${SellerReview.tableName}.calification
        FROM ${SellerReview.tableName}
        WHERE ${SellerReview.tableName}.buyer_id = ${cleintId}`
        ).then((res) => {
                return Promise.all(res.rows.map(r => {
                    return getClientByID(pool, cleintId).then((buyer) => {
                        return getClientByID(pool, r.seller_id).then((seller) => {
                            return new SellerReview(r.id, buyer, seller, r.description, r.calification)
                        })
                    })
                }))
        }).catch(e => {
            console.error(e.stack)
            const aux = new ClientBuilder().build()
            return [new SellerReview("", aux, aux, "", 0)]
        })
    client.release()
    return result
}