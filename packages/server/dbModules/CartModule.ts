import { Cart } from '../entities/Cart'
import { Pool } from 'pg';
import { Product } from '../entities/Product';
import { getProductByID } from './ProductModule';


export const insertCart = async (pool: Pool, cart: Cart) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO cart_table (client_id) 
        VALUES ('${cart.clientID}')
        RETURNING id`
        ).then((res) => {
                const cartId = res.rows[0].id
                cart.products.forEach(p => addProductToCart(pool, cartId, p))
                return cartId
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

export const addProductToCart = async (pool: Pool, cartId: string, p:Product) => {
    const client = await pool.connect()
    const result: Promise<string> = client.query(
        `INSERT INTO cart_product_table (cart_id, product_id) 
        VALUES ('${cartId}', '${p.id}')
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
const util = require('util')


export const getCartProducts = async (pool: Pool, clientId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT product_id
        FROM cart_product_table
        WHERE cart_id = ${clientId}
        `
        ).then((res) => {return res.rows})
        .then((ids) => {
            const promises =  ids.map(id => getProductByID(pool,id.product_id))
           return Promise.all(promises)
        }).then((res) => res[0])
        .catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}



export const getCartByClientId = async (pool: Pool, clientId: string) => {
    const client = await pool.connect()
    const result = client.query(
        `SELECT *
        FROM cart_table
        WHERE cart_table.id = ${clientId}
        `
        ).then((res) => {
                const cart = res.rows[0]
                return getCartProducts(pool, cart.id).then((res2) => {
                    cart.products = res2
                    return cart
                })
        }).catch(e => {
            console.error(e.stack)
            return ""
        })
    client.release()
    return result
}

