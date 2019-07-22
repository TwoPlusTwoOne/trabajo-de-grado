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