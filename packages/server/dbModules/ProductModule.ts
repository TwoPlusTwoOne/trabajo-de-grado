import { Product } from '../entities/Product'
import { Pool } from 'pg';
import {insertReview, getReviewsForProduct} from './ReviewModule'
import { json } from 'express';
import { Review } from '../entities/Review';
import { Client } from '../entities/Client';
import { ClientBuilder } from '../builders/ClientBuilder';
import { ProductBuilder } from '../builders/ProductBuilder';


export const insertProduct = async (pool: Pool, product: Product) => {
    const client = await pool.connect()
    const result: Promise<Product> = client.query(
        `INSERT INTO ${Product.tableName} (name, description) 
        VALUES ('${product.name}', '${product.description}')
        RETURNING id`
        ).then((res) => {
            const productId = res.rows[0]
            return Promise.all(
                product.reviews.map(i => insertReview(pool, new Review(i.id, i.buyer, i.description, i.calification)))
                ).then((reviewIds) => {
                return Promise.all(reviewIds.map(reviewId => insertProductReview(pool, productId, reviewId))
                )})
                .then((x) => {return productId})
        }).catch(e => {
            console.error(e.stack)
            return new ProductBuilder().build()
        })
    client.release()
    return result
}


export const insertProductReview = async (pool: Pool, productId: string, reviewId: string) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO product_review_table (product_id, review_id) 
        VALUES ('${productId}', '${reviewId}')
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
        }).catch(e => {
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
            ${Product.tableName}.name,  
            ${Product.tableName}.description
        FROM ${Product.tableName}
        WHERE ${Product.tableName}.id = ${productId}
        GROUP BY ${Product.tableName}.id
        `
        ).then((r) => {
            const result =  r.rows[0]
            return getReviewsForProduct(pool, productId).then((reviews: Review[]) => {
                return  new Product(result.id, result.name, result.description, reviews)
            })
        }).catch(e => {
            console.error(e.stack)
            return new ProductBuilder().build()
        })
    client.release()
    return result
}
