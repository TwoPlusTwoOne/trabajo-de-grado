import { getClientByID } from './ClientModule'
import { Pool } from 'pg';
import {Sale} from '../entities/Sale'
import { Client } from '../entities/Client';
import { ClientBuilder } from '../builders/ClientBuilder';
import { getPublicationByID } from './PublicationModule';
import { Publication } from '../entities/Pubilcation';
import { PublicationBuilder } from '../builders/PublicationBuilder';

export const insertSale = async (pool: Pool, publication_id: string, price:number, buyer_id:string, traking_id: string, direction:string) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Sale.tableName} (publication_id, price, buyer_id, traking_id, direction) 
        VALUES ('${publication_id}', '${price}', '${buyer_id}', '${traking_id}', '${direction}')
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
                return getPublicationByID(pool, r.product_id).then ((publication: Publication) => {
                    return getClientByID(pool, r.buyer_id).then((client: Client) => {
                        return new Sale(id, publication, client, r.price, r.traking_id, r.direction)
                    })
                })
        }).catch(e => {
            console.error(e.stack)
            return new Sale("", new PublicationBuilder().build(), new ClientBuilder().build(), 0, "", "")
        })
    client.release()
    return result
}