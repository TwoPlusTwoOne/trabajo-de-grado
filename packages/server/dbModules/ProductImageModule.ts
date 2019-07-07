import { ProductImage } from '../entities/ProductImage'
import { Pool } from 'pg';


export const insertImageProduct = async (pool: Pool, productImage: ProductImage) => {
    const client = await pool.connect()
    console.log(`image: ${productImage.image} \nproductId: ${productImage.productID}`)
    const result: Promise<string> = client.query(
        `INSERT INTO product_image_table (image, product_id) 
        VALUES ('${productImage.image}', '${productImage.productID}')
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