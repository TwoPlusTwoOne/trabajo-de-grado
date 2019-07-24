import { PublicationImage } from '../entities/PublicationImage'
import { Pool } from 'pg';


export const insertImagePublication = async (pool: Pool, publicationImage: PublicationImage) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${PublicationImage.tableName} (image, publication_id) 
        VALUES ('${publicationImage.image}', '${publicationImage.publicationID}')
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

export const deleteImagePublication = async (pool: Pool, id: string) => {
    const client = await pool.connect()
    const result = client.query(
        `DELETE FROM ${PublicationImage.tableName}
        WHERE ID = ${id}`
        ).then((res) => {
                return res
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}


export const getImagesForPublication = async (pool: Pool, publicationId: string) => {
    const client = await pool.connect()
    const result: Promise<PublicationImage[]> = client.query(
        `SELECT
            ${PublicationImage.tableName}.id,
            ${PublicationImage.tableName}.image,
            ${PublicationImage.tableName}.publication_id
        FROM ${PublicationImage.tableName}
        WHERE ${PublicationImage.tableName}.publication_id = ${publicationId}`
        ).then((res) => {
                return res.rows.map(p => {
                    return new PublicationImage(p.id, p.image, p.publication_id)
                })
        }).catch(e => {
            console.error(e.stack)
            return [new PublicationImage("", "", "")]
        })
    client.release()
    return result
}