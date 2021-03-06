import { Product } from '../entities/Product'
import { Pool } from 'pg';
import {getProductReviewsForProduct} from './ProductReviewModule'
import { SellerReview } from '../entities/SellerReview';
import { ProductBuilder } from '../builders/ProductBuilder';
import { ProductReview } from '../entities/ProductReview';


export const insertProduct = async (pool: Pool, product: Product) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO ${Product.tableName} (name) 
        VALUES ('${product.name}')
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

export const getAllProducts = async (pool: Pool) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT id
        FROM ${Product.tableName}
        `
        ).then((r) => {
            const ids = r.rows.map(r => r.id)
            return Promise.all(ids.map(id => getProductByID(pool, id)))
        }).catch(() => {
            return [new ProductBuilder().build()]
        })
    client.release()
    return result
}

export const getProductByID = async (pool: Pool, productId: string) => {
    const client = await pool.connect()
    const result: Promise<Product> = client.query(
        `SELECT 
        ${Product.tableName}.id, 
        ${Product.tableName}.name  
        FROM ${Product.tableName}
        WHERE ${Product.tableName}.id = ${productId}
        GROUP BY ${Product.tableName}.id
        `
        ).then((r) => {
            const result =  r.rows[0]
            return getProductReviewsForProduct(pool, productId).then((reviews: ProductReview[]) => {
                return  new Product(result.id, result.name, reviews)
            })
        }).catch(e => {
            console.error(e.stack)
            return new ProductBuilder().build()
        })
    client.release()
    return result
}
