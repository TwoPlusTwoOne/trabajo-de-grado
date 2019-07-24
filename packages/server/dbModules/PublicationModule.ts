import { Publication } from '../entities/Pubilcation'
import { Pool } from 'pg';
import {insertImagePublication, getImagesForPublication} from './PublicationImageModule'
import {getProductByID} from './ProductModule'
import { PublicationImage } from '../entities/PublicationImage';
import { Product } from '../entities/Product';
import { getClientByID } from './ClientModule';
import { Client } from '../entities/Client';
import { PublicationBuilder } from '../builders/PublicationBuilder';


export const insertPublication = async (pool: Pool, publication: Publication) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Publication.tableName} (name, value, description, seller_id, product_id) 
        VALUES ('${publication.name}', '${publication.value}', '${publication.description}', '${publication.seller.id}', '${publication.product.id}')
        RETURNING id`
        ).then((res) => {
            publication.images.forEach(i => insertImagePublication(pool, new PublicationImage(i.id, i.image, res.rows[0].id)))
            return res.rows[0].id
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

export const updatePublication = async (pool: Pool, publication: Publication) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `UPDATE ${Publication.tableName} 
        SET name = '${publication.name}', 
        value = '${publication.value}', 
        description = '${publication.description}', 
        seller_id = '${publication.seller.id}', 
        product_id = '${publication.product.id}'
        WHERE id = ${publication.id}
        RETURNING id`
        ).then((res) => {
            publication.images.forEach(i => insertImagePublication(pool, new PublicationImage(i.id, i.image, res.rows[0].id)))
            return res.rows[0].id
        }).catch(e => {
            console.error(e.stack)
            return e.stack
        })
    client.release()
    return result
}

export const deletePublication = async (pool: Pool, id: string) => {
    const client = await pool.connect()
    const result = 
    client.query(
        `DELETE FROM ${PublicationImage.tableName} WHERE publication_id = ${id}`
        ).then ((x) => {
            client.query(
                `DELETE FROM ${Publication.tableName} WHERE id = ${id}`
                ).then((res) => {
                    return res
                }).catch(e => {
                    console.error(e.stack)
                    return ""
            })
        })
    client.release()
    return result
}



export const getAllPublications = async (pool: Pool) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT id
        FROM ${Publication.tableName}
        `
        ).then((r) => {
            const ids = r.rows.map(r => r.id)
            return Promise.all(ids.map(id => getPublicationByID(pool, id)))
        }).catch(e => {
            console.error(e.stack)
            return JSON.stringify({ error: e.stack })
        })
    client.release()
    return result
}


export const getPublicationByID = async (pool: Pool, publicationID: string) => {
    const client = await pool.connect()
    const result: Promise<Publication> = client.query(
        `SELECT 
            ${Publication.tableName}.id, 
            ${Publication.tableName}.name, 
            ${Publication.tableName}.value, 
            ${Publication.tableName}.product_id,
            ${Publication.tableName}.description, 
            ${Publication.tableName}.seller_id
        FROM ${Publication.tableName}
        WHERE ${Publication.tableName}.id = ${publicationID}
        `
        ).then((r) => {
            const result = r.rows[0]
            const productId = result.product_id
            return getImagesForPublication(pool, publicationID).then((images: PublicationImage[]) => {
                return getProductByID(pool, productId).then((p: Product) => {
                    return getClientByID(pool, result.seller_id).then((client: Client) => {
                        return new Publication(result.id, result.name, result.value, client, images, p, result.description)
                    })
                })
            })
        }).catch(e => {
            console.error(e.stack)
            return new PublicationBuilder().build()
        })
    client.release()
    return result
}
